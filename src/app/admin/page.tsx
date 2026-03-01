"use client";

import { useEffect, useState } from "react";
import {
    createProject,
    getProjects,
    deleteProject,
    createCertificate,
    getCertificates,
    deleteCertificate,
    createExperience,
    getExperiences,
    deleteExperience
} from "@/app/actions";
import type { Project, Certificate, Experience } from "@/lib/schema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState<"projects" | "certificates" | "experiences">("projects");

    const [projects, setProjects] = useState<Project[]>([]);
    const [certificates, setCertificates] = useState<Certificate[]>([]);
    const [experiences, setExperiences] = useState<Experience[]>([]);

    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);

    const [projectImagePreview, setProjectImagePreview] = useState<string | null>(null);
    const [certificateImagePreview, setCertificateImagePreview] = useState<string | null>(null);
    const [uploadingImage, setUploadingImage] = useState(false);

    // Validation errors
    const [errors, setErrors] = useState<Record<string, string[]>>({});

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setIsFetching(true);
        try {
            const [fetchedProjects, fetchedCertificates, fetchedExperiences] = await Promise.all([
                getProjects(),
                getCertificates(),
                getExperiences()
            ]);
            setProjects(fetchedProjects as unknown as Project[]);
            setCertificates(fetchedCertificates as unknown as Certificate[]);
            setExperiences(fetchedExperiences as unknown as Experience[]);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsFetching(false);
        }
    };

    const handleProjectSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setErrors({});

        const form = e.currentTarget;
        const formData = new FormData(form);
        const imageFile = formData.get("image_file") as File;

        let uploadedImageUrl = formData.get("image_url") as string;

        if (imageFile && imageFile.size > 0) {
            setUploadingImage(true);
            try {
                const uploadFormData = new FormData();
                uploadFormData.append("file", imageFile);

                const response = await fetch("/api/upload", {
                    method: "POST",
                    body: uploadFormData,
                });

                if (!response.ok) {
                    throw new Error("Failed to upload image");
                }

                const blob = await response.json();
                uploadedImageUrl = blob.url;
            } catch (error) {
                console.error("Error uploading image:", error);
                alert("Gagal mengunggah gambar. Silakan coba lagi.");
                setIsLoading(false);
                setUploadingImage(false);
                return;
            } finally {
                setUploadingImage(false);
            }
        }

        // Set the actual image url
        if (uploadedImageUrl) {
            formData.set("image_url", uploadedImageUrl);
        }

        const result = await createProject(formData);

        if (result.error) {
            // It might be a zod error object or a string
            if (typeof result.error === "string") {
                alert(result.error);
            } else {
                setErrors(result.error as Record<string, string[]>);
            }
        } else if (result.success) {
            form.reset();
            setProjectImagePreview(null);
            await fetchData();
        }

        setIsLoading(false);
    };

    const handleCertificateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setErrors({});

        const form = e.currentTarget;
        const formData = new FormData(form);
        const imageFile = formData.get("image_file") as File;

        let uploadedImageUrl = formData.get("image_url") as string;

        if (imageFile && imageFile.size > 0) {
            setUploadingImage(true);
            try {
                const uploadFormData = new FormData();
                uploadFormData.append("file", imageFile);

                const response = await fetch("/api/upload", {
                    method: "POST",
                    body: uploadFormData,
                });

                if (!response.ok) {
                    throw new Error("Failed to upload certificate image");
                }

                const blob = await response.json();
                uploadedImageUrl = blob.url;
            } catch (error) {
                console.error("Error uploading image:", error);
                alert("Gagal mengunggah gambar sertifikat. Silakan coba lagi.");
                setIsLoading(false);
                setUploadingImage(false);
                return;
            } finally {
                setUploadingImage(false);
            }
        }

        // Set the actual image url
        if (uploadedImageUrl) {
            formData.set("image_url", uploadedImageUrl);
        }

        const result = await createCertificate(formData);

        if (result.error) {
            if (typeof result.error === "string") {
                alert(result.error);
            } else {
                setErrors(result.error as Record<string, string[]>);
            }
        } else if (result.success) {
            form.reset();
            setCertificateImagePreview(null);
            await fetchData();
        }

        setIsLoading(false);
    };

    const handleExperienceSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setErrors({});

        const form = e.currentTarget;
        const formData = new FormData(form);

        // Convert description textarea (one line per item) to JSON array string
        const descriptionRaw = formData.get("description") as string;
        if (descriptionRaw) {
            const lines = descriptionRaw.split("\n").map(l => l.trim()).filter(l => l !== "");
            formData.set("description", JSON.stringify(lines));
        } else {
            formData.set("description", "[]");
        }

        const result = await createExperience(formData);

        if (result.error) {
            if (typeof result.error === "string") {
                alert(result.error);
            } else {
                setErrors(result.error as Record<string, string[]>);
            }
        } else if (result.success) {
            form.reset();
            await fetchData();
        }

        setIsLoading(false);
    };

    const handleDeleteProject = async (id: number | undefined) => {
        if (!id) return;
        if (!confirm("Are you sure you want to delete this project?")) return;

        setIsLoading(true);
        const result = await deleteProject(id);
        if (result.success) {
            await fetchData();
        } else {
            alert(result.error);
        }
        setIsLoading(false);
    };

    const handleDeleteCertificate = async (id: number | undefined) => {
        if (!id) return;
        if (!confirm("Are you sure you want to delete this certificate?")) return;

        setIsLoading(true);
        const result = await deleteCertificate(id);
        if (result.success) {
            await fetchData();
        } else {
            alert(result.error);
        }
        setIsLoading(false);
    };

    const handleDeleteExperience = async (id: number | undefined) => {
        if (!id) return;
        if (!confirm("Are you sure you want to delete this experience?")) return;

        setIsLoading(true);
        const result = await deleteExperience(id);
        if (result.success) {
            await fetchData();
        } else {
            alert(result.error);
        }
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

                {/* Tabs */}
                <div className="flex space-x-4 border-b border-gray-200 mb-8">
                    <button
                        onClick={() => setActiveTab("projects")}
                        className={`py-2 px-6 font-medium text-sm transition-colors ${activeTab === "projects"
                            ? "border-b-2 border-blue-600 text-blue-600"
                            : "text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        Manage Projects
                    </button>
                    <button
                        onClick={() => setActiveTab("certificates")}
                        className={`py-2 px-6 font-medium text-sm transition-colors ${activeTab === "certificates"
                            ? "border-b-2 border-blue-600 text-blue-600"
                            : "text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        Manage Certificates
                    </button>
                    <button
                        onClick={() => setActiveTab("experiences")}
                        className={`py-2 px-6 font-medium text-sm transition-colors ${activeTab === "experiences"
                            ? "border-b-2 border-blue-600 text-blue-600"
                            : "text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        Manage Experiences
                    </button>
                </div>

                {/* Tab Content */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    {activeTab === "projects" ? (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Form Section */}
                            <div className="lg:col-span-1">
                                <h2 className="text-xl font-semibold mb-4">Add New Project</h2>
                                <form onSubmit={handleProjectSubmit} className="space-y-4">
                                    <div>
                                        <Label className="mb-1">Title</Label>
                                        <Input name="title" type="text" disabled={isLoading} />
                                        {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title[0]}</p>}
                                    </div>
                                    <div>
                                        <Label className="mb-1">Description</Label>
                                        <textarea name="description" rows={3} className="w-full px-3 py-2 border border-input rounded-md bg-transparent shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" disabled={isLoading}></textarea>
                                        {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description[0]}</p>}
                                    </div>
                                    <div>
                                        <Label className="mb-1">Image Upload</Label>
                                        <Input
                                            name="image_file"
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    setProjectImagePreview(URL.createObjectURL(file));
                                                } else {
                                                    setProjectImagePreview(null);
                                                }
                                            }}
                                            disabled={isLoading || uploadingImage}
                                        />
                                        {projectImagePreview && (
                                            <div className="mt-2">
                                                <img src={projectImagePreview} alt="Preview" className="h-32 object-cover rounded-md" />
                                            </div>
                                        )}
                                        {errors.image_url && <p className="text-red-500 text-xs mt-1">{errors.image_url[0]}</p>}
                                    </div>
                                    <div>
                                        <Label className="mb-1">Deploy URL (Optional)</Label>
                                        <Input name="deploy_url" type="url" disabled={isLoading} />
                                        {errors.deploy_url && <p className="text-red-500 text-xs mt-1">{errors.deploy_url[0]}</p>}
                                    </div>
                                    <div>
                                        <Label className="mb-1">Tech Stack</Label>
                                        <Input name="tech_stack" type="text" placeholder="e.g. Next.js, TailwindCSS" disabled={isLoading} />
                                        {errors.tech_stack && <p className="text-red-500 text-xs mt-1">{errors.tech_stack[0]}</p>}
                                    </div>
                                    <Button
                                        type="submit"
                                        disabled={isLoading || uploadingImage}
                                        className="w-full"
                                    >
                                        {uploadingImage ? "Uploading Image..." : isLoading ? "Saving..." : "Save Project"}
                                    </Button>
                                </form>
                            </div>

                            {/* List Section */}
                            <div className="lg:col-span-2">
                                <h2 className="text-xl font-semibold mb-4">Existing Projects</h2>
                                {isFetching ? (
                                    <div className="flex justify-center items-center h-48 border border-gray-200 rounded-md text-gray-500">
                                        Loading data...
                                    </div>
                                ) : projects.length === 0 ? (
                                    <div className="flex justify-center items-center h-48 border border-gray-200 border-dashed rounded-md text-gray-500">
                                        No projects found.
                                    </div>
                                ) : (
                                    <div className="overflow-x-auto border border-gray-200 rounded-md">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tech Stack</th>
                                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {projects.map((project) => (
                                                    <tr key={project.id}>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{project.title}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{project.tech_stack}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                            <Button
                                                                variant="destructive"
                                                                size="sm"
                                                                onClick={() => handleDeleteProject(project.id)}
                                                                disabled={isLoading}
                                                            >
                                                                Delete
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : activeTab === "certificates" ? (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Form Section */}
                            <div className="lg:col-span-1">
                                <h2 className="text-xl font-semibold mb-4">Add New Certificate</h2>
                                <form onSubmit={handleCertificateSubmit} className="space-y-4">
                                    <div>
                                        <Label className="mb-1">Name</Label>
                                        <Input name="name" type="text" disabled={isLoading} />
                                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name[0]}</p>}
                                    </div>
                                    <div>
                                        <Label className="mb-1">Issuer</Label>
                                        <Input name="issuer" type="text" disabled={isLoading} />
                                        {errors.issuer && <p className="text-red-500 text-xs mt-1">{errors.issuer[0]}</p>}
                                    </div>
                                    <div>
                                        <Label className="mb-1">Image Upload</Label>
                                        <Input
                                            name="image_file"
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    setCertificateImagePreview(URL.createObjectURL(file));
                                                } else {
                                                    setCertificateImagePreview(null);
                                                }
                                            }}
                                            disabled={isLoading || uploadingImage}
                                        />
                                        {certificateImagePreview && (
                                            <div className="mt-2">
                                                <img src={certificateImagePreview} alt="Preview" className="h-32 object-cover rounded-md" />
                                            </div>
                                        )}
                                        {errors.image_url && <p className="text-red-500 text-xs mt-1">{errors.image_url[0]}</p>}
                                    </div>
                                    <div>
                                        <Label className="mb-1">Date</Label>
                                        <Input name="date" type="text" placeholder="e.g. 2024 or MM YYYY" disabled={isLoading} />
                                        {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date[0]}</p>}
                                    </div>
                                    <Button
                                        type="submit"
                                        disabled={isLoading || uploadingImage}
                                        className="w-full"
                                    >
                                        {uploadingImage ? "Uploading Image..." : isLoading ? "Saving..." : "Save Certificate"}
                                    </Button>
                                </form>
                            </div>

                            {/* List Section */}
                            <div className="lg:col-span-2">
                                <h2 className="text-xl font-semibold mb-4">Existing Certificates</h2>
                                {isFetching ? (
                                    <div className="flex justify-center items-center h-48 border border-gray-200 rounded-md text-gray-500">
                                        Loading data...
                                    </div>
                                ) : certificates.length === 0 ? (
                                    <div className="flex justify-center items-center h-48 border border-gray-200 border-dashed rounded-md text-gray-500">
                                        No certificates found.
                                    </div>
                                ) : (
                                    <div className="overflow-x-auto border border-gray-200 rounded-md">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issuer</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {certificates.map((cert) => (
                                                    <tr key={cert.id}>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{cert.name}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cert.issuer}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cert.date}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                            <Button
                                                                variant="destructive"
                                                                size="sm"
                                                                onClick={() => handleDeleteCertificate(cert.id)}
                                                                disabled={isLoading}
                                                            >
                                                                Delete
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        /* ==================== EXPERIENCES TAB ==================== */
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Form Section */}
                            <div className="lg:col-span-1">
                                <h2 className="text-xl font-semibold mb-4">Add New Experience</h2>
                                <form onSubmit={handleExperienceSubmit} className="space-y-4">
                                    <div>
                                        <Label className="mb-1">Company</Label>
                                        <Input name="company" type="text" placeholder="e.g. PT Acme Corp" disabled={isLoading} />
                                        {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company[0]}</p>}
                                    </div>
                                    <div>
                                        <Label className="mb-1">Role</Label>
                                        <Input name="role" type="text" placeholder="e.g. FullStack Developer" disabled={isLoading} />
                                        {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role[0]}</p>}
                                    </div>
                                    <div>
                                        <Label className="mb-1">Location <span className="text-gray-400 text-xs">(optional)</span></Label>
                                        <Input name="location" type="text" placeholder="e.g. Jakarta, Indonesia" disabled={isLoading} />
                                    </div>
                                    <div>
                                        <Label className="mb-1">Type</Label>
                                        <select
                                            name="type"
                                            className="w-full px-3 py-2 border border-input rounded-md bg-transparent shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                            disabled={isLoading}
                                            defaultValue="Full-time"
                                        >
                                            <option value="Full-time">Full-time</option>
                                            <option value="Contract">Contract</option>
                                            <option value="Freelance">Freelance</option>
                                            <option value="Internship">Internship</option>
                                        </select>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <Label className="mb-1">Start Date</Label>
                                            <Input name="start_date" type="month" disabled={isLoading} />
                                            {errors.start_date && <p className="text-red-500 text-xs mt-1">{errors.start_date[0]}</p>}
                                        </div>
                                        <div>
                                            <Label className="mb-1">End Date <span className="text-gray-400 text-xs">(kosong = Present)</span></Label>
                                            <Input name="end_date" type="month" disabled={isLoading} />
                                        </div>
                                    </div>
                                    <div>
                                        <Label className="mb-1">Description <span className="text-gray-400 text-xs">(satu tanggung jawab per baris)</span></Label>
                                        <textarea
                                            name="description"
                                            rows={4}
                                            className="w-full px-3 py-2 border border-input rounded-md bg-transparent shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                            placeholder={"Developed REST API using Node.js\nImplemented CI/CD pipeline\nMentored junior developers"}
                                            disabled={isLoading}
                                        ></textarea>
                                        {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description[0]}</p>}
                                    </div>
                                    <div>
                                        <Label className="mb-1">Skills <span className="text-gray-400 text-xs">(comma separated)</span></Label>
                                        <Input name="skills" type="text" placeholder="e.g. Next.js, React, TypeScript" disabled={isLoading} />
                                    </div>
                                    <Button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full"
                                    >
                                        {isLoading ? "Saving..." : "Save Experience"}
                                    </Button>
                                </form>
                            </div>

                            {/* List Section */}
                            <div className="lg:col-span-2">
                                <h2 className="text-xl font-semibold mb-4">Existing Experiences</h2>
                                {isFetching ? (
                                    <div className="flex justify-center items-center h-48 border border-gray-200 rounded-md text-gray-500">
                                        Loading data...
                                    </div>
                                ) : experiences.length === 0 ? (
                                    <div className="flex justify-center items-center h-48 border border-gray-200 border-dashed rounded-md text-gray-500">
                                        No experiences found.
                                    </div>
                                ) : (
                                    <div className="overflow-x-auto border border-gray-200 rounded-md">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
                                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {experiences.map((exp) => (
                                                    <tr key={exp.id}>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{exp.company}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exp.role}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700">{exp.type}</span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {exp.start_date} — {exp.end_date || "Present"}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                            <Button
                                                                variant="destructive"
                                                                size="sm"
                                                                onClick={() => handleDeleteExperience(exp.id)}
                                                                disabled={isLoading}
                                                            >
                                                                Delete
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
