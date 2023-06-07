import multer from 'multer'

export const userStorage = multer.diskStorage({
    destination: (_, _file, cb) => {
        cb(null, process.cwd() + `/src/public/users`)
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname)
    }
})

export const postStorage = multer.diskStorage({
    destination: (_, _file, cb) => {
        cb(null, process.cwd() + `/src/public/posts`)
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname)
    }
})