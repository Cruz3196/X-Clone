import Post from "./Post";
import PostSkeleton from "../skeletons/PostSkeleton";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const Posts = ({ feedType, username, userId }) => {
	const getPostEndPoint = (feedType) => {
	//* these endpoints are used to fetch different feeds and are passed to profilepage.jsx to update profile and home page UI.
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
		// Fix: Include feedType in queryKey to cache different feeds separately
		queryKey: ["posts", feedType],
		queryFn: async() => {
		try{
			// Get the endpoint inside the queryFn to avoid render issues
			const endpoint = getPostEndPoint(feedType);
			const res = await fetch(endpoint);
			const data = await res.json();
			if(!res.ok){
				throw new Error(data.error || "Something went wrong");
			}
			// Return the correct data structure based on the endpoint
			return data.feedPosts || data.posts || data;
		} catch (error){
			throw new Error(error);
		}
		},
	});

	useEffect(() => {
		refetch();
	}, [feedType, refetch, username]);

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
			{posts.map((post) => (
				<Post key={post._id} post={post} />
			))}
			</div>
		)}
		</>
	);
};

export default Posts;