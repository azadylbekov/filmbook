import React, { FC } from "react";

interface ContainerProps {
	children?: React.ReactNode
}

const Container: FC<ContainerProps> = ({ children }: ContainerProps) => {
	return (
		<div className="container mx-auto">
			{children}
		</div>
	)
}

export default Container;