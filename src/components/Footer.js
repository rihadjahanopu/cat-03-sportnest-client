import {
	Mail,
	MapPin,
	Phone,
} from "lucide-react";
import Link from "next/link";

const FacebookIcon = (props) => (
	<svg
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		{...props}>
		<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
	</svg>
);

const XIcon = (props) => (
	<svg
		viewBox="0 0 24 24"
		fill="currentColor"
		{...props}>
		<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
	</svg>
);

const LinkedinIcon = (props) => (
	<svg
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		{...props}>
		<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
		<rect x="2" y="9" width="4" height="12" />
		<circle cx="4" cy="4" r="2" />
	</svg>
);

export default function Footer() {
	return (
		<footer className="border-t border-card-border bg-secondary/30 mt-20">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
					<div className="col-span-1 md:col-span-1">
						<Link
							href="/"
							className="flex items-center gap-2 mb-4">
							<span className="text-2xl font-bold text-gradient">
								SportNest
							</span>
						</Link>
						<p className="text-gray-400 text-sm mb-6">
							The ultimate platform to book premium sports facilities, join
							communities, and manage your venues.
						</p>
						<div className="flex gap-4">
							<a
								href="https://facebook.com"
								target="_blank"
								rel="noopener noreferrer"
								className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-secondary transition-colors"
								aria-label="Facebook">
								<FacebookIcon className="w-5 h-5" />
							</a>
							<a
								href="https://x.com"
								target="_blank"
								rel="noopener noreferrer"
								className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-secondary transition-colors"
								aria-label="X (formerly Twitter)">
								<XIcon className="w-5 h-5" />
							</a>
							<a
								href="https://linkedin.com"
								target="_blank"
								rel="noopener noreferrer"
								className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-secondary transition-colors"
								aria-label="LinkedIn">
								<LinkedinIcon className="w-5 h-5" />
							</a>
						</div>
					</div>

					<div>
						<h4 className="text-lg font-bold mb-4">Quick Links</h4>
						<ul className="space-y-2">
							<li>
								<Link
									href="/"
									className="text-gray-400 hover:text-primary transition-colors text-sm">
									Home
								</Link>
							</li>
							<li>
								<Link
									href="/facilities"
									className="text-gray-400 hover:text-primary transition-colors text-sm">
									Browse Facilities
								</Link>
							</li>
							<li>
								<Link
									href="/add-facility"
									className="text-gray-400 hover:text-primary transition-colors text-sm">
									Partner With Us
								</Link>
							</li>
							<li>
								<Link
									href="/login"
									className="text-gray-400 hover:text-primary transition-colors text-sm">
									Login
								</Link>
							</li>
						</ul>
					</div>

					<div>
						<h4 className="text-lg font-bold mb-4">Support</h4>
						<ul className="space-y-2">
							<li>
								<Link
									href="#"
									className="text-gray-400 hover:text-primary transition-colors text-sm">
									FAQ
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-gray-400 hover:text-primary transition-colors text-sm">
									Terms of Service
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-gray-400 hover:text-primary transition-colors text-sm">
									Privacy Policy
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-gray-400 hover:text-primary transition-colors text-sm">
									Contact Us
								</Link>
							</li>
						</ul>
					</div>

					<div>
						<h4 className="text-lg font-bold mb-4">Contact Info</h4>
						<ul className="space-y-4">
							<li className="flex items-start gap-3 text-sm text-gray-400">
								<MapPin className="w-5 h-5 text-primary shrink-0" />
								<span>
									123 Sports Avenue, Suite 100
									<br />
									Dhaka, Bangladesh
								</span>
							</li>
							<li className="flex items-center gap-3 text-sm text-gray-400">
								<Phone className="w-5 h-5 text-primary shrink-0" />
								<span>+88017XXXXXXXX</span>
							</li>
							<li className="flex items-center gap-3 text-sm text-gray-400">
								<Mail className="w-5 h-5 text-primary shrink-0" />
								<span>info@sportnest.com</span>
							</li>
						</ul>
					</div>
				</div>

				<div className="mt-12 pt-8 border-t border-card-border text-center text-sm text-gray-500">
					<p>
						&copy; {new Date().getFullYear()} SportNest. All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
}
