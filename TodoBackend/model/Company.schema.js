const mongoose = require("mongoose");

const CompanySchema = mongoose.Schema(
  {
    _id: {
      type: Number,
      required: [true, "id should be passed on"],
    },
    companyId: {
      type: Number,
    },
    company_name: {
      type: String,
      max: [15, "Company Length Name can not be more 15 characters"],
      trim: true,
    },
    primary_text: {
      type: String,
      max: [125, "text Length can not be 125 characters"],
      trim: true,
    },
    Headline: String,
    desciption: String,
    CTA: String,
    imageUrl: String,
    url: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("CompanyInfo", CompanySchema);
