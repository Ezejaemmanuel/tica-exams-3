import React from "react";

type SectionHeadingProps = {
    children: React.ReactNode;
};

export default function SectionHeading({ children }: SectionHeadingProps) {
    return (
        <h2 className="text-3xl font-medium lg:text-6xl text-yellow-600 capitalize mb-8 text-center">
            {children}
        </h2>
    );
}
