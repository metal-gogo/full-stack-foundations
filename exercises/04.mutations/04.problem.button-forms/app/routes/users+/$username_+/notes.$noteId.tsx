import { json, type DataFunctionArgs } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { Button } from '~/components/ui/button.tsx'
import { db } from '~/utils/db.server.ts'

export async function loader({ params }: DataFunctionArgs) {
	const note = db.note.findFirst({
		where: {
			id: {
				equals: params.noteId,
			},
		},
	})
	if (!note) {
		throw new Response('Note note found', { status: 404 })
	}
	return json({
		note: { title: note.title, content: note.content },
	})
}

// 🐨 export an action function that uses the params from the DataFunctionArgs
//  🐨 delete the note from the database
//  🐨 return a redirect to the user's notes page

export default function NoteRoute() {
	const data = useLoaderData<typeof loader>()

	return (
		<div className="flex h-full flex-col overflow-y-auto overflow-x-hidden">
			<div className="flex-grow">
				<h2 className="mb-2 text-h2 lg:mb-6">{data.note.title}</h2>
				<p className="text-sm md:text-lg">{data.note.content}</p>
			</div>
			<div className="flex justify-end gap-4">
				{/* 🐨 wrap this Button in a Form with the proper method */}
				<Button
					// 🐨 add a type="submit" prop to this Button
					variant="destructive"
				>
					Delete
				</Button>
				<Button asChild>
					<Link to="edit">Edit</Link>
				</Button>
			</div>
		</div>
	)
}