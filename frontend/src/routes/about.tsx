import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/about')({
	component: About,
});

function About() {
	return (
		<div className="p-6 bg-gray-950 shadow-sm shadow-yellow-400 text-white">
			<div className="max-w-4xl mx-auto">
				<h2 className="text-4xl font-bold mb-4 text-center border-b-2 border-gray-700 pb-2">
					About Us
				</h2>
				<p className="mt-6 text-lg leading-relaxed">
					Welcome to our platform! We are dedicated to providing the best
					service to our users. Our goal is to create an environment where
					everyone can thrive and achieve their objectives.
				</p>
				<p className="mt-4 text-lg leading-relaxed">
					Our team is composed of talented individuals who are passionate about
					what they do. We believe in innovation, collaboration, and continuous
					improvement.
				</p>
				<p className="mt-4 text-lg leading-relaxed">
					Thank you for being a part of our journey. We look forward to growing
					together.
				</p>
			</div>
		</div>
	);
}
