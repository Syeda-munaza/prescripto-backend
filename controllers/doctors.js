//API for adding doctor
const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      experience,
      degree,
      timings,
      about,
      fee,
      address,
    } = req.body;
    const doctor = await Doctor.findOne({ email });
  } catch (error) {}
};
