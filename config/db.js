import mongoose from 'mongoose'

const uri = 'mongodb+srv://emekasan:nnaemeka981222100@emekacluster.jagnfxo.mongodb.net/test'
const connectDB = async () => {
    try {
        const conn =  await mongoose.connect (uri, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            
        })

        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
    } catch (error) {
        console.error(`Error: ${error.message}`.red.underline.bold)
        process.exit(1)
    }
}

export default connectDB