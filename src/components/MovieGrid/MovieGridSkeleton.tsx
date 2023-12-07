import MovieCardSkeleton from "./MovieCardSkeleton";

export default function MovieGridSkeleton({ count = 10 }) {
	const skeletons = Array.from(Array(count).keys())

	return (
		<div className="lg:mt-5 mt-2 xl:grid-cols-5 lg:grid-cols-4 sm:grid-cols-3 grid gap-4 grid-cols-2">
			{skeletons.map(skeleton => (
				<MovieCardSkeleton key={skeleton} />
			))}
		</div>
	)
}
