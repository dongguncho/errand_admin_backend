import passport from "passport";

export const isAuthenticated = () => {
    return passport.authenticate('jwt', { session: false });
}