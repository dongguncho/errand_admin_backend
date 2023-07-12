import passport from "passport";
import passportJWT, { ExtractJwt } from "passport-jwt";
import { Repository } from "typeorm";
import { appDataSource } from "../config/data-source";
import { User } from "../entities/user.entity";
// import logger from "../middlewares/winston.middleware";

export class Passport {
  private jwtStrategy;
  private jwtSecret: string;
  private memberRepository: Repository<User>;
  constructor() {
    this.jwtStrategy = passportJWT.Strategy;
    this.jwtSecret = process.env.JWT_SECRET;
    this.memberRepository = appDataSource.getRepository(User);
  }

  public config() {
    passport.use(
      new this.jwtStrategy(
        {
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          secretOrKey: this.jwtSecret,
        },
        async (payload, done) => {
          try {
            const member = await this.memberRepository.findOneBy({
              userId: payload.userId,
            });
            if (!member && member.password !== payload.password) {
              return done(null, false);
            } else {
              return done(null, member);
            }
          } catch (error) {
            return done(null, false);
          }
        }
      )
    );
  }
}
