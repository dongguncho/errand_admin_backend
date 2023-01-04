import { Request, Response } from 'express';

const selectUser = async (req: Request, res: Response) => {
    const param = req.params

    return res.status(200).json({
        status: 200,
        message: "유저 조회 성공",
        data: param
    });
};

export default selectUser;