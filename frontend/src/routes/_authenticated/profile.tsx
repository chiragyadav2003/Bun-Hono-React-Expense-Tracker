import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { userQueryOptions } from '@/lib/api';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/_authenticated/profile')({
	component: Profile,
});

function Profile() {
	const { isPending, data, error } = useQuery(userQueryOptions);
	if (isPending) return 'Loading...';
	if (error) return 'not logged in';
	return (
		<div>
			<div className="flex items-center gap-4">
				<Avatar>
					{data.user.picture ? (
						<AvatarImage src={data.user.picture} alt={data.user.given_name} />
					) : (
						<AvatarFallback>
							{data.user.given_name[0] + data.user.family_name[0]}
						</AvatarFallback>
					)}
				</Avatar>
				<p>
					Hello, {data.user.given_name} {data.user.family_name}
				</p>
			</div>
			<Button className="mt-6" asChild>
				<a href="/api/logout">Logout</a>
			</Button>
		</div>
	);
}
