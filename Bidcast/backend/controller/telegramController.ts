import { Request, Response } from "express";
import { TelegramService } from "../service/telegramService";

export class TelegramController {
    constructor(private TelegramService: TelegramService) { }


    checkVerified = async (req: Request, res: Response) => {
        // console.log(req.user)
        // const reqUserTgName = req.user && req.user.telegram_acct? req.user.telegram_acct:"";
        // const reqUserID = req.user && req.user.id? req.user.id:0;
        const { tgGetUsername, tgGetEmail } = req.body;
        console.log("tgGetEmail", tgGetEmail);
        console.log("tgGetUsername", tgGetUsername);

        const resData = await this.TelegramService.checkVerified(tgGetEmail)
        console.log("result", resData.data.results[0]);


        if (resData.data.results[0]) {
            let userTgAcct = resData.data.results[0].telegram_acct
            let username = resData.data.results[0].username
            let userTgVerified = resData.data.results[0].telegram_is_verified
            if (userTgAcct == tgGetUsername) {
                if (!userTgVerified) {
                    const resData = await this.TelegramService.tgAllowVerified(tgGetEmail, username)
                    
                    console.log("resData", resData.data.results[0]);
                    let result = resData.data.results[0]
                    let email = resData.data.results[0].email
                    res.json({
                        success: true,
                        data: { msg: `電郵：${email} Telegram帳戶 完成確認程序`, result }
                    })

                } else {
                    res.json({
                        success: false,
                        data: { msg: "Telegram帳戶 已完成確認程序" }
                    })
                }
            } else {
                console.log("Invalid information-1")
                res.json({
                    success: false,
                    data: { msg: "你正在使用的Telegram帳戶 與 Bidcast上登記的Telegram帳戶不符，請更正後再嘗試" }
                })
            }
        } else {
            console.log("Invalid information-2")
            res.json({
                success: false,
                data: { msg: "接收電郵並未在bidcast註冊" }
            })
        }

    }


}