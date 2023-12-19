import { FC } from "react";
import MovieCardSkeleton from "./MovieCardSkeleton";

interface MovieGridSkeletonProps {
	count?: number
}

const MovieGridSkeleton: FC<MovieGridSkeletonProps> = ({ count = 10 }) => {
	const skeletons = Array.from(Array(count).keys())

	return (
		<div className="lg:mt-5 mt-2 xl:grid-cols-5 lg:grid-cols-4 sm:grid-cols-3 grid gap-4 grid-cols-2">
			{skeletons.map(skeleton => (
				<MovieCardSkeleton key={skeleton} />
			))}
		</div>
	)
}

export default MovieGridSkeleton;