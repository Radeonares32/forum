import { FileFilterCallback } from 'multer'
import { Request, Express } from 'express'


export function postFilter({ _, file, cb }: {_:Request,file:Express.Multer.File,cb:FileFilterCallback}) {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true);
    }
    else {
        cb(null, false);
        return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
}