"use client";
import { useState, useEffect } from "react";
import { Save, User, MapPin, IndianRupee, Briefcase, Clock, FileText, CheckCircle2 } from "lucide-react";

export default function ProfilePage() {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    role: "",
    location: "",
    salary: "",
    experience: "Fresher",
    resumeUrl: ""
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
          
          setFormData(prev => ({ ...prev, resumeUrl: base64Data }));
          alert("Resume converted and prepared for save!");
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

      // Save profile to localStorage instead of Firebase!
      localStorage.setItem("my_profile", JSON.stringify(finalProfileData));
      
      alert("Profile and Resume Saved Successfully!");
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to save profile or resume. Please check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-teal-500/20 p-3 rounded-xl">
          <User className="w-8 h-8 text-teal-400" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">Your Profile</h1>
          <p className="text-slate-400 mt-1">Configure your job preferences and upload your resume PDF.</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="glass p-6 md:p-8 rounded-2xl space-y-6">
          <h2 className="text-xl font-semibold text-white border-b border-white/10 pb-4 mb-6">Job Preferences</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 ml-1">Desired Role</label>
              <div className="relative">
                <Briefcase className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" />
                <input 
                  type="text" 
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  placeholder="e.g. Frontend Engineer" 
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 ml-1">Location</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" />
                <input 
                  type="text" 
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Remote, Mumbai, Bangalore" 
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 ml-1">Target Salary (₹)</label>
              <div className="relative">
                <IndianRupee className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" />
                <input 
                  type="text" 
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  placeholder="e.g. 10,00,000" 
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 ml-1">Experience Level</label>
              <div className="relative">
                <Clock className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" />
                <select 
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all appearance-none"
                  required
                >
                  <option value="Fresher">Fresher (0 years)</option>
                  <option value="1-3 years">1-3 years</option>
                  <option value="3-5 years">3-5 years</option>
                  <option value="5+ years">5+ years</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="glass p-6 md:p-8 rounded-2xl space-y-6">
          <div className="flex justify-between items-end border-b border-white/10 pb-4 mb-6">
            <h2 className="text-xl font-semibold text-white">Resume (PDF)</h2>
          </div>
          
          <div className="space-y-4">
            <label className="block w-full p-8 border-2 border-dashed border-white/10 rounded-xl bg-black/20 text-center hover:border-teal-500/50 transition-colors cursor-pointer group">
              <input 
                type="file" 
                accept="application/pdf" 
                onChange={handleFileChange} 
                className="hidden" 
              />
              {file ? (
                <div className="flex flex-col items-center justify-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-teal-400 mb-2 group-hover:scale-110 transition-transform" />
                  <p className="text-md font-medium text-teal-300">{file.name}</p>
                  <p className="text-xs text-slate-400">Click to change file</p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center space-y-2">
                  <FileText className="w-10 h-10 text-slate-400 mb-2 group-hover:scale-110 transition-transform" />
                  <p className="text-md font-medium text-slate-300">Click to upload your Resume (PDF)</p>
                  <p className="text-xs text-slate-500">Max size 5MB</p>
                </div>
              )}
            </label>
            {formData.resumeUrl && !file && (
               <p className="text-sm text-teal-400 flex items-center gap-2">
                 <CheckCircle2 className="w-4 h-4"/> A resume is already uploaded to your profile.
               </p>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <button 
            type="submit"
            disabled={loading || (!file && !formData.resumeUrl)}
            className="bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40"
          >
            {loading ? "Uploading & Saving..." : <><Save className="w-5 h-5" /> Save Profile</>}
          </button>
        </div>
      </form>
    </div>
  );
}
