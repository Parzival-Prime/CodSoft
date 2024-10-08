import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_DB)
        console.log(`connection with mongoDB established Successfully.`)
    } catch (error) {
        console.log(error)
    }
}

export default connectDB