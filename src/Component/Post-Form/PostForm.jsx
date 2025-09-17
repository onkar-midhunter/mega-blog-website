import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button, RTE, Select } from "../index";
import { useDispatch, useSelector } from "react-redux";
import service from "../../appWrite/config";
import { addPost, updatePost } from "../../store/PostSlice";
import { FileText, Image, Hash, Eye, Upload } from "lucide-react";

function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues, formState: { errors } } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });
  
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  
  const actualUserData = userData?.userData || userData;
  const userId = actualUserData?.$id;
  const userName = actualUserData?.name;

  useEffect(() => {
    if (post?.featuredImage) {
      setImagePreview(service.getFilePreview(post.featuredImage));
    }
  }, [post]);

  const submit = async (data) => {
    setLoading(true);
    try {
      if (post) {
        // Update post flow
        const file = data.image[0] ? await service.uploadFile(data.image[0]) : null;

        if (file) {
          service.deleteFile(post.featuredImage);
        }

        const dbPost = await service.updatePost(post.$id, {
          ...data,
          featuredImage: file ? file.$id : post.featuredImage,
        });

        if (dbPost) {
          dispatch(updatePost(dbPost));
          navigate(`/post/${dbPost.$id}`);
        }
      } else {
        // Create post flow
        const file = await service.uploadFile(data.image[0]);

        if (file) {
          const fileId = file.$id;
          data.featuredImage = fileId;

          const dbPost = await service.createPost({
            ...data,
            userId: userId,
            authorName: userName,
          });

          if (dbPost) {
            dispatch(addPost(dbPost));
            navigate(`/post/${dbPost.$id}`);
          }
        }
      }
    } catch (error) {
      console.error("Error submitting post:", error);
    } finally {
      setLoading(false);
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && value.length > 0)
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="py-8 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            {post ? "Edit Post" : "Create New Post"}
          </h1>
          <p className="text-xl text-slate-600">
            {post ? "Update your existing post" : "Share your story with the world"}
          </p>
        </div>

        <form onSubmit={handleSubmit(submit)} className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Left side - Content */}
            <div className="lg:w-2/3 p-8 lg:p-12">
              <div className="space-y-8">
                {/* Title Input */}
                <div>
                  <label className="flex items-center gap-2 text-lg font-semibold text-slate-800 mb-3">
                    <FileText className="w-5 h-5" />
                    Title
                  </label>
                  <input
                    type="text"
                    className={`w-full px-4 py-3 text-lg border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                      errors.title ? 'border-red-300' : 'border-slate-300'
                    }`}
                    placeholder="Enter an engaging title..."
                    {...register("title", { 
                      required: "Title is required",
                      minLength: { value: 5, message: "Title must be at least 5 characters" }
                    })}
                  />
                  {errors.title && (
                    <p className="mt-2 text-sm text-red-600">{errors.title.message}</p>
                  )}
                </div>

                {/* Slug Input */}
                <div>
                  <label className="flex items-center gap-2 text-lg font-semibold text-slate-800 mb-3">
                    <Hash className="w-5 h-5" />
                    Slug (URL)
                  </label>
                  <input
                    type="text"
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                      errors.slug ? 'border-red-300' : 'border-slate-300'
                    }`}
                    placeholder="auto-generated-from-title"
                    {...register("slug", { 
                      required: "Slug is required" 
                    })}
                    onInput={(e) => {
                      setValue("slug", slugTransform(e.currentTarget.value), {
                        shouldValidate: true,
                      });
                    }}
                  />
                  {errors.slug && (
                    <p className="mt-2 text-sm text-red-600">{errors.slug.message}</p>
                  )}
                </div>

                {/* Content Editor */}
                <div>
                  <label className="flex items-center gap-2 text-lg font-semibold text-slate-800 mb-3">
                    <FileText className="w-5 h-5" />
                    Content
                  </label>
                  <div className="border-2 border-slate-300 rounded-xl overflow-hidden">
                    <RTE
                      name="content"
                      control={control}
                      defaultValue={getValues("content")}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Media & Settings */}
            <div className="lg:w-1/3 bg-slate-50 p-8 lg:p-12">
              <div className="space-y-8">
                {/* Featured Image */}
                <div>
                  <label className="flex items-center gap-2 text-lg font-semibold text-slate-800 mb-4">
                    <Image className="w-5 h-5" />
                    Featured Image
                  </label>
                  
                  {/* Image Preview */}
                  {imagePreview && (
                    <div className="mb-4 relative">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-xl border-2 border-slate-200"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-20 rounded-xl flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
                        <Eye className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  )}

                  {/* File Input */}
                  <div className="relative">
                    <input
                      type="file"
                      className="hidden"
                      id="image-upload"
                      accept="image/png, image/jpg, image/jpeg, image/gif"
                      {...register("image", { required: !post ? "Featured image is required" : false })}
                      onChange={(e) => {
                        register("image").onChange(e);
                        handleImageChange(e);
                      }}
                    />
                    <label
                      htmlFor="image-upload"
                      className="flex items-center justify-center gap-3 w-full px-4 py-3 border-2 border-dashed border-slate-300 rounded-xl hover:border-blue-500 hover:bg-blue-50 cursor-pointer transition-all duration-200"
                    >
                      <Upload className="w-5 h-5" />
                      <span>{imagePreview ? "Change Image" : "Upload Image"}</span>
                    </label>
                  </div>
                  {errors.image && (
                    <p className="mt-2 text-sm text-red-600">{errors.image.message}</p>
                  )}
                </div>

                {/* Status */}
                <div>
                  <label className="flex items-center gap-2 text-lg font-semibold text-slate-800 mb-3">
                    <Eye className="w-5 h-5" />
                    Status
                  </label>
                  <select
                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    {...register("status", { required: true })}
                  >
                    <option value="active">Active (Published)</option>
                    <option value="inactive">Draft (Unpublished)</option>
                  </select>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full py-4 text-lg"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      {post ? "Updating..." : "Publishing..."}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <Upload className="w-5 h-5" />
                      {post ? "Update Post" : "Publish Post"}
                    </div>
                  )}
                </Button>

                {/* Cancel Button */}
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="w-full py-3 px-6 border-2 border-slate-300 text-slate-700 font-medium rounded-xl hover:border-slate-400 hover:bg-slate-100 transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostForm;