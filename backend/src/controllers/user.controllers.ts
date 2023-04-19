import { Handler } from 'express'
//! Service
import { UserService } from '../service/service'

export class UserController {
    static getUser: Handler = async (req, res) => {
        const user = await new UserService().userFindAll()
        res.json({ user })
    }
    static getUserId: Handler = async (req, res) => {
        const token:any = req.headers['x-access-token']
        if(token) {
            const user:any = await new UserService().userFind(token)
            res.json({ user: user,userId:user.user[0][0]})
        }
        else {
            res.status(401).json({
                message: "not found token"
            })
        } 
    }
    static createUser: Handler = async (req, res) => {
        const userService = new UserService()
        const { nickname, email, gender, date, password, passwordRepeat} = req.body
        if (password !== passwordRepeat) {
            res.json({
                error: "password not match"
            })
        }
        else {
            const user = await userService.userCreate(nickname, email, date, gender, password)
            if (user.message) {
                res.json({
                    message: user.message
                })
            }
            else {
                res.json({
                    message: (await user.create)?.message
                })
            }

        }
    }
    static updateUser: Handler = async (req, res) => {
        const userService = new UserService()
        const { id, nickname, email, gender, date, password, hash, oldPassword, newPassword} = req.body
        if (!newPassword) {
            res.json({
                message: "newPassword empty !!"
            })
        }
        else {
            const user = userService.userUpdate(id,nickname,email,date,oldPassword,newPassword,hash,gender,password)
            if (user.message) {
                res.json({
                    message: user.message
                })
            }
            else {
                res.json({
                    message: await user.update
                })
            }
        }
    }
    static deleteUser: Handler = async (req, res) => {
        const userService = new UserService()
        const { id } = req.body
        const user = userService.userDelete(id)
        if (user.message) {
            res.json({
                message: user.message
            })
        }
        else {
            res.json({
                message: user.delete
            })
        }

    }
    static signUser: Handler = async (req, res) => {
        const userService = new UserService()
        const { email, password } = req.body
        const user = await userService.userSign(email, password)
        
        if (user.token) {
            res.json(user.token)
        }
        else {
            res.json(user.sign)
        }
    }
    static logoutUser: Handler = async ({ headers }, res) => {
        const userService = new UserService()
        const token = headers['x-access-token']
        if (token) {
            const user = await userService.userLogout(token as string)
            res.status(200).json({
                message: user.message
            })
        }
        else {
            res.status(401).json({
                message: "not found token"
            })
        }
    }
    static followUser: Handler = async (req, res) => {
        const userService = new UserService()
        const { follow, followers } = req.body
        if (follow && followers) {
            const user = await userService.userFollow(follow, followers)
            res.status(200).json({
                message: await user.follow
            })
        }
        else {
            res.status(401).json({
                message: "not found token"
            })
        }
    }
    static unFollowUser: Handler = async (req, res) => {
        const userService = new UserService()
        const { follow, followers } = req.body
        if (follow && followers) {
            const user = await userService.userUnFollow(follow, followers)
            res.status(200).json({
                message: await user.follow
            })
        }
        else {
            res.status(401).json({
                message: "not found token"
            })
        }
    }
    static getFollowUser: Handler = async (req, res) => {
        const userService = new UserService()
        const { follow } = req.body
        if (follow) {
            const user = await userService.userGetFollow(follow)
            res.status(200).json({
                user: user.follow
            })
        }
        else {
            res.status(401).json({
                message: "not found token"
            })
        }
    }
    static getFollowersUser: Handler = async (req, res) => {
        const userService = new UserService()
        const { followers } = req.body
        if (followers) {
            const user = await userService.userGetFollowers(followers)
            res.status(200).json({
                user: user.followers
            })
        }
        else {
            res.status(401).json({
                message: "not found token"
            })
        }
    }
}