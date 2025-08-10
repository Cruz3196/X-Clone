import Post from "./Post";
import PostSkeleton from "../skeletons/PostSkeleton";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const Posts = ({ feedType, username, userId }) => {
    const getPostEndPoint = (feedType) => {
        switch(feedType){
        case "forYou":
            return "/api/posts/all";
        case "following":
            return "/api/posts/following";
        case "posts":
            return `/api/posts/user/${username}`;
        case "likes":
            return `/api/posts/likes/${userId}`;
        default:
            return "/api/posts/all"
        }
    }

    const {data: posts, isLoading, refetch, isRefetching} = useQuery({
        queryKey: ["posts", feedType, username, userId],
        queryFn: async() => {
        try{
            const endpoint = getPostEndPoint(feedType);
            const res = await fetch(endpoint);
            const data = await res.json();
            if(!res.ok){
                throw new Error(data.error || "Something went wrong");
            }
            
            // FIX: Check if the returned data is an array. If not, return an empty array.
            // This prevents the .filter() method from being called on a non-array.
            if (!Array.isArray(data)) {
                return [];
            }

            return data;
        } catch (error){
            throw new Error(error.message);
        }
        },
    });

    useEffect(() => {
        refetch();
    }, [feedType, refetch, username, userId]);

    return (
        <>
        {(isLoading || isRefetching) && (
            <div className='flex flex-col justify-center'>
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
            </div>
        )}
        {!isLoading && !isRefetching && posts?.length === 0 && (
            <p className='text-center my-4'>No posts in this tab. Switch 👻</p>
        )}
        {!isLoading && !isRefetching && posts && (
            <div>
            {posts.filter(Boolean).map((post) => (
                <Post key={post._id} post={post} />
            ))}
            </div>
        )}
        </>
    );
};

export default Posts;
