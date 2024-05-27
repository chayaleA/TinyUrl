import mongoose from 'mongoose';

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/TinyUrl', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log("Mongo connected");
}

main().catch(err => console.log(err));

export default main;
