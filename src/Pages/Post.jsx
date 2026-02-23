import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/Config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(false);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    const authLoading = useSelector((state) => state.auth.loading);

    // FIX: wait for auth to finish loading before checking authorship
    const isAuthor = !authLoading && post && userData
        ? post.userId === userData.$id
        : false;

    useEffect(() => {
        if (slug) {
            service.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            }).finally(() => setLoading(false)); // FIX: always clear loading
        } else {
            navigate("/");
        }
    }, [slug, navigate]);

    const deletePost = () => {
        // FIX: confirm before deleting
        if (!window.confirm("Are you sure you want to delete this post? This cannot be undone.")) return;

        setDeleting(true);
        service.deletePost(post.$id).then((status) => {
            if (status) {
                // FIX: only delete file if featuredImage exists
                if (post.featuredImage) {
                    service.deleteFile(post.featuredImage);
                }
                navigate("/");
            } else {
                alert("Failed to delete post. Please try again.");
                setDeleting(false);
            }
        });
    };

    // FIX: show spinner while post is loading instead of blank screen
    if (loading) {
        return (
            <div className="w-full min-h-[60vh] flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-2 border-gray-200 border-t-gray-800 rounded-full animate-spin" />
                    <p className="text-sm text-gray-400">Loading post...</p>
                </div>
            </div>
        );
    }

    if (!post) return null;

    return (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative rounded-xl p-2">
                    <img
                        src={service.getFileView(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl border-2 w-150 p-2"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3 cursor-pointer hover:bg-green-400">
                                    Edit
                                </Button>
                            </Link>
                            <Button
                                bgColor="bg-red-500"
                                onClick={deletePost}
                                disabled={deleting}
                                className="cursor-pointer hover:bg-red-400"
                            >
                                {deleting ? "Deleting..." : "Delete"}
                            </Button>
                        </div>
                    )}
                </div>

                <div className="mb-6">
                    <span className="p-3 text-4xl font-bold">{post.title}</span>
                </div>

                <div className="browser-css text-2xl w-full bg-gray-200 rounded-xl p-4">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    );
}