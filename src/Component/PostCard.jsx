import React from "react";
import service from "../appWrite/config";
import { Link } from "react-router-dom";
import { format } from "date-fns"; // for pretty date formatting
import authService from "../appWrite/auth";

function PostCard({ $id, title, featuredImage,  $createdAt }) {
  

  return (
    <Link to={`/post/${$id}`}>
      <div className="w-72 h-88 bg-white rounded-2xl shadow-md hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden flex flex-col">
        {/* Image */}
        <div className="h-44 w-full">
          <img
            src={service.getFilePreview(featuredImage)}
            alt={title}
            className="w-full h-full object-cover rounded-t-2xl border-b-4 border-amber-600"
          />
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col justify-between">
          {/* Title */}
          <h2 className="text-lg font-semibold text-gray-800 hover:text-amber-600 line-clamp-2">
            {title}
          </h2>

          {/* Meta Info */}
          <div className="mt-3 flex items-center justify-between text-sm text-gray-500">
            
            <span>{format(new Date($createdAt), "MMM dd, yyyy")}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
