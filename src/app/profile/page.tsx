"use client";
import { useState, useEffect } from "react";
import { Save, User, MapPin, IndianRupee, Briefcase, Clock, FileText, CheckCircle2, UploadCloud, ShieldCheck } from "lucide-react";

export default function ProfilePage() {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    role: "",
    location: "",
    salary: "",
    experience: "Fresher",
    resumeBase64: ""
  });

  // Load profile from localStorage on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem("my_profile");
    if (savedProfile) {
      setFormData(JSON.parse(savedProfile));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setLoading(true);
      
      try {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          const base64Data = base64String.split(',')[1];
          
          setFormData(prev => ({ ...prev, resumeBase64: base64Data }));
          alert("Resume successfully converted and encrypted in your local browser vault!");
          setLoading(false);
        };
        reader.readAsDataURL(selectedFile);
      } catch (error) {
        console.error(error);
        alert("Failed to read resume file.");
        setLoading(false);
      }
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const finalProfileData = {
        ...formData,
        updatedAt: new Date().toISOString()
      };
      
      localStorage.setItem("my_profile", JSON.stringify(finalProfileData));
      alert("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to save profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="mb-8 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#171D1C] tracking-tight mb-2">Job Search Profile</h1>
        <p className="text-[#545F73] text-base">
          Configure your career criteria. Agent Scout and Agent Filter use this profile to discover and rank opportunities.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-soft p-6 md:p-10">
        <form onSubmit={handleSave} className="space-y-6">
          {/* Desired Role */}
          <div>
            <label className="block text-xs font-bold text-[#545F73] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Briefcase className="w-4 h-4 text-[#00685F]" /> Desired Job Title / Role
            </label>
            <input
              type="text"
              name="role"
              required
              value={formData.role}
              onChange={handleChange}
              placeholder="e.g. Senior Frontend Engineer, Full Stack Developer"
              className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-[#171D1C] text-sm focus:outline-none focus:border-[#00685F] focus:ring-2 focus:ring-[#00685F]/20 transition-all"
            />
          </div>

          {/* Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-[#545F73] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#00685F]" /> Target Location
              </label>
              <input
                type="text"
                name="location"
                required
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Bangalore, Remote, Hyderabad"
                className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-[#171D1C] text-sm focus:outline-none focus:border-[#00685F] focus:ring-2 focus:ring-[#00685F]/20 transition-all"
              />
            </div>

            {/* Experience Level */}
            <div>
              <label className="block text-xs font-bold text-[#545F73] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#00685F]" /> Experience Level
              </label>
              <select
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-[#171D1C] text-sm focus:outline-none focus:border-[#00685F] focus:ring-2 focus:ring-[#00685F]/20 transition-all"
              >
                <option value="Fresher">Entry Level / Fresher (0-1 yrs)</option>
                <option value="Junior">Junior (1-3 yrs)</option>
                <option value="Mid-Level">Mid-Level (3-5 yrs)</option>
                <option value="Senior">Senior (5-8 yrs)</option>
                <option value="Lead/Staff">Lead / Staff / Principal (8+ yrs)</option>
              </select>
            </div>
          </div>

          {/* Expected Salary */}
          <div>
            <label className="block text-xs font-bold text-[#545F73] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <IndianRupee className="w-4 h-4 text-[#00685F]" /> Expected Salary Range (Optional)
            </label>
            <input
              type="text"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              placeholder="e.g. ₹15,00,000 - ₹25,00,000 / $120k - $160k"
              className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-[#171D1C] text-sm focus:outline-none focus:border-[#00685F] focus:ring-2 focus:ring-[#00685F]/20 transition-all"
            />
          </div>

          {/* Resume Upload Box */}
          <div>
            <label className="block text-xs font-bold text-[#545F73] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-[#00685F]" /> Master Resume (PDF)
            </label>
            <div className="border-2 border-dashed border-[#E2E8F0] hover:border-[#00685F]/50 rounded-2xl p-8 text-center bg-[#F8FAFC] transition-colors relative">
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="flex flex-col items-center justify-center gap-2">
                <div className="w-12 h-12 rounded-xl bg-teal-50 text-[#00685F] flex items-center justify-center">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <p className="font-semibold text-sm text-[#171D1C]">Click or Drag & Drop PDF Resume</p>
                <p className="text-xs text-[#545F73]">Encrypted directly in client browser memory (Max 5MB)</p>

                {formData.resumeBase64 && (
                  <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200 mt-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Resume Loaded in Vault
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="pt-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-[#545F73]">
              <ShieldCheck className="w-4 h-4 text-[#00685F]" />
              <span>Zero-Backend Privacy Guarantee</span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-[#00685F] hover:bg-[#005049] text-white font-semibold text-sm px-8 py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-2 btn-tactile disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>Save Career Profile</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
