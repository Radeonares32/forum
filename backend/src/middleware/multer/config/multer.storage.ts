import multer from 'multer'

export const postStorage = multer.diskStorage({
    destination: (_, _file, cb) => {
        cb(null, process.cwd() + `/public/users`)
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname)
    }
})