import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI in .env.local");
}

let cached = global.mongo || { conn: null, promise: null };

export async function connectDB() {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        const client = new MongoClient(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        cached.promise = client.connect().then((client) => ({
            client,
            db: client.db("user_management"),
        }));
    }

    cached.conn = await cached.promise;
    return cached.conn;
}
