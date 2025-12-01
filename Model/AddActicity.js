import Activityschema from "./Activity";

export const AddActivity = async (title, subTitle) => {
  return await Activityschema.create({
    title,
    subTitle,
    createdAt: new Date(),
  });
};
