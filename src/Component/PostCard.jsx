import React from "react";
import service from "../appWrite/config";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { User, Calendar } from "lucide-react";

function PostCard({ $id, title, featuredImage, $createdAt, authorName }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-200 hover:border-blue-200 transform hover:-translate-y-2">
        {/* Image */}
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src={service.getFilePreview(featuredImage)}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Title */}
          <h2 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 line-clamp-2 mb-4 leading-tight transition-colors duration-200">
            {title}
          </h2>

          {/* Meta Info */}
          <div className="space-y-3">
            {/* Author */}
            {authorName && (
              <div className="flex items-center gap-2 text-slate-600">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium">By {authorName}</span>
              </div>
            )}
            
            {/* Date */}
            <div className="flex items-center gap-2 text-slate-500">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">{format(new Date($createdAt), "MMM dd, yyyy")}</span>
            </div>
          </div>

          {/* Read More Indicator */}
          <div className="mt-4 flex items-center gap-2 text-blue-600 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-1">
            <span className="text-sm font-medium">Read more</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;