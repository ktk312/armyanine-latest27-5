//Deep Seek code are here
import { useEffect, useRef, useState } from "react";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import DefaultInputs from "../../../components/form/form-elements/DefaultInputs";
import FileInputExample from "../../../components/form/form-elements/FileInputExample";
import RadioButtons from "../../../components/form/form-elements/RadioButtons";
import TextAreaInput from "../../../components/form/form-elements/TextAreaInput";
import { useCreateDog } from "../../../components/dogsCategory/hooks/useCreateDogs";
import { useDogStore } from "../../../store/dogStore";
import { useNavigate } from "react-router";

export interface DogFormData {
  dogName: string;
  breedId: number | string | null;
  dob: string; // ISO string format
  deathDate: string;
  soldDate: string;
  loanDate: string;
  transferDate: string;
  sex: string;
  categoryId: number | string | null;
  countryId: number | string | null;
  cityId: number | string | null;
  status: "Active" | "Inactive" | "Sold" | "Deceased"; // Use union type for specific values
  microchip: string;
  location: string;
  breeder: string;
  sireId: number | null;
  damId: number | null;
  KP: string;
  color: string;
  hair: string;
  HD: string;
  ED: string;
  weight: string;
  chestDepth: string;
  chestCircumference: string;
  achievements: string;
  isDeath: boolean;
  isSold: boolean;
  isLoan: boolean;
  CNS: boolean;
  CDN: boolean;
  cdnDate?: string;
  cnsDate?: string;
  isTransfer: boolean;
  virtuesAndFaults: string,
  breedingAdvice: string,
  miscellaneousComments: string,
  progenyTrainability: string,
  friendlyUrl: string,
  deathReason?: string;
  soldRemarks?: string;
  soldTo?: string;
  loanRemarks?: string;
  loanTo?: string;
  transferRemarks?: string;
  transferTo?: string;
}
export default function FormElements() {
  const { createNewDog, loading, updateNewDog } = useCreateDog();
  const { selectedDog } = useDogStore();
  console.log("---selected Dog are", selectedDog)
  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<DogFormData>({
    dogName: "",
    breedId: null,
    isDeath: false,
    deathDate: new Date().toISOString(),
    soldDate: new Date().toISOString(),
    loanDate: new Date().toISOString(),
    transferDate: new Date().toISOString(),
    isSold: false,
    isLoan: false,
    isTransfer: false,
    CDN: false,
    CNS: false,
    dob: new Date().toISOString(), // Format as YYYY-MM-DD
    cdnDate: new Date().toISOString(),
    cnsDate: new Date().toISOString(),
    sex: "",
    categoryId: null,
    countryId: null,
    cityId: null,
    status: "Active",
    microchip: "",
    location: "",
    breeder: "",
    sireId: null,
    damId: null,
    KP: "",
    color: "",
    hair: "",
    HD: "",
    ED: "",
    weight: "",
    chestDepth: "",
    chestCircumference: "",
    achievements: "",
    virtuesAndFaults: "",
    breedingAdvice: "",
    miscellaneousComments: "",
    progenyTrainability: "",
    friendlyUrl: "",
    deathReason: "",
    soldRemarks: "",
    soldTo: "",
    loanRemarks: "",
    loanTo: "",
    transferRemarks: "",
    transferTo: ""
  });



  const resetForm = () => {
    setFormData({
      dogName: "",
      breedId: null,
      isDeath: false,
      deathDate: "",
      soldDate: "",
      loanDate: "",
      transferDate: "",
      isSold: false,
      isLoan: false,
      isTransfer: false,
      CDN: false,
      CNS: false,
      cdnDate: '',
      cnsDate: '',
      dob: "",
      sex: "",
      categoryId: null,
      countryId: null,
      cityId: null,
      status: "Active",
      microchip: "",
      location: "",
      breeder: "",
      sireId: null,
      damId: null,
      KP: "",
      color: "",
      hair: "",
      HD: "",
      ED: "",
      weight: "",
      chestDepth: "",
      chestCircumference: "",
      achievements: "",
      virtuesAndFaults: "",
      breedingAdvice: "",
      miscellaneousComments: "",
      progenyTrainability: "",
      friendlyUrl: "",
      deathReason: "",
      soldRemarks: "",
      soldTo: "",
      loanRemarks: "",
      loanTo: "",
      transferRemarks: "",
      transferTo: ""
    });

    // Notify parent component
    setFile(null);
    if (formRef.current) formRef.current.reset();
    console.log("Form Data after reset:", formData);

  };

  const resetSelectedDog = useDogStore(state => state.resetSelectedDog);


  //Initilize form when selected Dog changes
  useEffect(() => {
    if (selectedDog) {
      setFormData({
        dogName: String(selectedDog.dogName || ""),
        breedId: selectedDog.breedId ?? null,
        isDeath: Boolean(selectedDog.isDeath),
        deathDate: selectedDog.deathDate || "",
        soldDate: selectedDog.soldDate || "",
        loanDate: selectedDog.loanDate || "",
        transferDate: selectedDog.transferDate || "",
        isSold: Boolean(selectedDog.isSold),
        isLoan: Boolean(selectedDog.isLoan),
        isTransfer: Boolean(selectedDog.isTransfer),
        CDN: Boolean(selectedDog.CDN),
        CNS: Boolean(selectedDog.CNS),
        cdnDate: selectedDog.cdnDate || '',
        cnsDate: selectedDog.cnsDate || '',
        dob: selectedDog.dob || new Date().toISOString(),
        sex: selectedDog.sex || "",
        categoryId: selectedDog.categoryId ?? null,
        countryId: selectedDog.countryId ?? null,
        cityId: selectedDog.cityId ?? null,
        status: selectedDog.status as any || "Active",
        microchip: selectedDog.microchip?.id || "",
        location: selectedDog.location || "",
        breeder: selectedDog.breeder || "",
        sireId: selectedDog.sireId ?? null,
        damId: selectedDog.damId ?? null,
        KP: selectedDog.KP || "",
        color: selectedDog.color || "",
        hair: selectedDog.hair || "",
        HD: selectedDog.HD || "",
        ED: selectedDog.ED || "",
        weight: selectedDog.weight || "",
        chestDepth: selectedDog.chestDepth || "",
        chestCircumference: selectedDog.chestCircumference || "",
        achievements: selectedDog.achievements || "",
        virtuesAndFaults: selectedDog.virtuesAndFaults || "",
        breedingAdvice: selectedDog.breedingAdvice || "",
        miscellaneousComments: selectedDog.miscellaneousComments || "",
        progenyTrainability: selectedDog.progenyTrainability || "",
        friendlyUrl: selectedDog.friendlyUrl || "",
        deathReason: selectedDog.deathReason || "",
        soldRemarks: selectedDog.soldRemarks || "",
        soldTo: selectedDog.soldTo || "",
        loanRemarks: selectedDog.loanRemarks || "",
        loanTo: selectedDog.loanTo || "",
        transferRemarks: selectedDog.transferRemarks || "",
        transferTo: selectedDog.transferTo || "",

      });
    } else {
      // reset to blank
      setFormData({
        dogName: "",
        breedId: null,
        isDeath: false,
        isSold: false,
        isLoan: false,
        isTransfer: false,
        CDN: false,
        CNS: false,
        cdnDate: '',
        cnsDate: '',
        dob: "",
        deathDate: "",
        soldDate: "",
        loanDate: "",
        transferDate: "",
        sex: "",
        categoryId: null,
        countryId: null,
        cityId: null,
        status: "Active",
        microchip: "",
        location: "",
        breeder: "",
        sireId: null,
        damId: null,
        KP: "",
        color: "",
        hair: "",
        HD: "",
        ED: "",
        weight: "",
        chestDepth: "",
        chestCircumference: "",
        achievements: "",
        virtuesAndFaults: "",
        breedingAdvice: "",
        miscellaneousComments: "",
        progenyTrainability: "",
        friendlyUrl: "",
        deathReason: "",
        soldRemarks: "",
        soldTo: "",
        loanRemarks: "",
        loanTo: "",
        transferRemarks: "",
        transferTo: ""

      });
    }
  }, [selectedDog]);
  // Clear selectedDog when component unmounts
  useEffect(() => {
    return () => {
      resetSelectedDog();
    };
  }, [resetSelectedDog]);
  // Handle input changes
  const handleInputChange = (name: string, value: string | number | boolean | File) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleFileUpload = (uploadedFile: File) => {
    setFile(uploadedFile);
  };

  const handleSubmit = async () => {
    const formDataToSend = new FormData();

    if (file) {
      formDataToSend.append("file", file);
    }
    // Append all other fields
    formDataToSend.append("dogName", formData.dogName);
    formDataToSend.append("friendlyUrl", formData.friendlyUrl);
    formDataToSend.append("categoryId", String(formData.categoryId));
    formDataToSend.append("breedId", String(formData.breedId));
    formDataToSend.append("countryId", String(formData.countryId));
    formDataToSend.append("cityId", String(formData.cityId));
    formDataToSend.append("dob", formData.dob);
    formDataToSend.append("deathDate", formData.deathDate);
    formDataToSend.append("soldDate", formData.soldDate);
    formDataToSend.append("loanDate", formData.loanDate);
    formDataToSend.append("transferDate", formData.transferDate);
    formDataToSend.append("sex", formData.sex);
    formDataToSend.append("status", formData.status);
    formDataToSend.append("microchip", formData.microchip);
    formDataToSend.append("location", formData.location);
    formDataToSend.append("breeder", formData.breeder);
    formDataToSend.append("sireId", String(formData.sireId));
    formDataToSend.append("damId", String(formData.damId));
    formDataToSend.append("KP", formData.KP);
    formDataToSend.append("color", formData.color);
    formDataToSend.append("hair", formData.hair);
    formDataToSend.append("HD", formData.HD);
    formDataToSend.append("ED", formData.ED);
    formDataToSend.append("weight", formData.weight);
    formDataToSend.append("chestDepth", formData.chestDepth);
    formDataToSend.append("chestCircumference", formData.chestCircumference);
    formDataToSend.append("achievements", formData.achievements);
    formDataToSend.append("virtuesAndFaults", formData.virtuesAndFaults);
    formDataToSend.append("breedingAdvice", formData.breedingAdvice);
    formDataToSend.append("miscellaneousComments", formData.miscellaneousComments);
    formDataToSend.append("progenyTrainability", formData.progenyTrainability);
    formDataToSend.append("cdnDate", formData.cdnDate || '');
    formDataToSend.append("cnsDate", formData.cnsDate || "");

    // Convert booleans to strings
    formDataToSend.append("isDeath", String(formData.isDeath));
    formDataToSend.append("isSold", String(formData.isSold));
    formDataToSend.append("isLoan", String(formData.isLoan));
    formDataToSend.append("isTransfer", String(formData.isTransfer));
    formDataToSend.append("CDN", String(formData.CDN));
    formDataToSend.append("CNS", String(formData.CNS));
    formDataToSend.append("deathReason", formData.deathReason || "");
    formDataToSend.append("soldRemarks", formData.soldRemarks || "");
    formDataToSend.append("soldTo", formData.soldTo || "");
    formDataToSend.append("loanRemarks", formData.loanRemarks || "");
    formDataToSend.append("loanTo", formData.loanTo || "");
    formDataToSend.append("transferRemarks", formData.transferRemarks || "");
    formDataToSend.append("transferTo", formData.transferTo || "");

    try {
      const requiredFields = [
        "dogName",
        "KP",
        "breedId",
        "categoryId",
        // "cityId",
        // "countryId",
        "sex",
        // "microchip",
      ];
      if (selectedDog) {
        for (const field of requiredFields) {
          if (!formData[field as keyof DogFormData]) {
            alert(`Please fill the required field: ${field}`);
            return;
          }
        }
        const response = await updateNewDog(formDataToSend, String(selectedDog?.id),);
        resetForm();  // Resets all form inputs
        return alert(response?.message);
        // }

      } else {
        for (const field of requiredFields) {
          if (!formData[field as keyof DogFormData]) {
            alert(`Please fill the required field: ${field}`);
            return;
          }
        }
        const response = await createNewDog(formDataToSend);
        if (response?.message === undefined) {
          return alert("Error adding dog !")
        } else {
          resetForm();  // Resets all form inputs
          alert(response?.message);
          navigate("/basic-tables")
        }
        // const response = await createDog(formDataToSend)
      }
      // Optionally reset form here
    } catch (error) {
      return alert("Error adding dog: " + error);
    }
  }


  return (
    <div>
      <PageBreadcrumb pageTitle={selectedDog ? `Edit ${selectedDog.dogName}` : "Add New Dog"} />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="space-y-6">
          <DefaultInputs onChange={handleInputChange} formData={formData} />
        </div>
        <div className="space-y-6">
          <RadioButtons onChange={handleInputChange} formData={formData} />
          <TextAreaInput
            onChange={handleInputChange} formData={formData}
          />
          <FileInputExample
            onFileUpload={handleFileUpload}
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-6 bg-blue-500 text-white px-4 py-2 rounded"
      >
        {loading ? (selectedDog ? "Updating..." : "Saving...") : (selectedDog ? "Update Dog" : "Add Dog")}      </button>
    </div>
  );
}







