import { config } from "dotenv";
config({ path: "./.env" });

console.log("Loaded URI:", process.env.MONGO_URI); // TEMP DEBUG LINE

const { dbConnection } = await import("./database/dbConnection.js");
const { User } = await import("./models/userSchema.js");


const createAdmin = async () => {
  const existing = await User.findOne({ email: "admin@example.com" });
  if (existing) {
    console.log("Admin already exists");
    process.exit();
  }
  await User.create({
    firstName: "Admin",
    lastName: "One",
    email: "admin@example.com",
    phone: "0700000000",
    password: "yourpassword",
    gender: "Male",
    aadhar: "123456789012",
    dob: "1990-01-01",
    role: "Admin",
  });
  console.log("Admin created!");
  process.exit();
};
dbConnection();
createAdmin();