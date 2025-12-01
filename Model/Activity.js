// import mongoose from "mongoose";

// const ActivitySchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//     },
//     subTitle: {
//       title: String,
//       required: true,
//     },
//     createdAt: {
//       type: Date,
//       default: Date.now(),
//     },
//   },
//   { timestamps: true } // built time and update Automatically
// );

// const Activityschema = mongoose.models.Acticity || mongoose.model("Acticity", ActivitySchema);

// export default Activityschema;

import mongoose from "mongoose";

const ActivitySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subTitle: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now, // function reference, not called
    },
  },
  { timestamps: true } // adds createdAt and updatedAt automatically
);

const Activityschema = mongoose.models.Activity || mongoose.model("Activity", ActivitySchema);

export default Activityschema;
