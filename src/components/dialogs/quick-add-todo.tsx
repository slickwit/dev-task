import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useTodoStore } from "@/store/todo.store";

// ----------------------------------------------------------------------

interface QuickAddTodoProps {
	open: boolean;
	onClose: () => void;
}

const todoSchema = z.object({
	todos: z.array(z.object({
		todo: z.string().trim().min(1, "Item name is required"),
		completed: z.boolean(),
	})).min(1, "Please add a todo item."),
});

export default function QuickAddTodo({ open = false, onClose }: QuickAddTodoProps) {
	const addMultipleTodo = useTodoStore(state => state.addMultiple);
	const methods = useForm<z.infer<typeof todoSchema>>({
		defaultValues: {
			todos: [{ todo: "", completed: false }],
		},
		resolver: zodResolver(todoSchema),
	});
	const values = methods.watch();
	const { fields, update, append, remove } = useFieldArray({ control: methods.control, name: "todos" });

	const onSubmit = async (data: z.infer<typeof todoSchema>) => {
		onClose();
		addMultipleTodo(data.todos);
		methods.reset({ todos: [{ todo: "", completed: false }] });
	};

	const errors = methods.formState.errors.todos;
	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[500px]">
				<DialogHeader>
					<DialogTitle>Quick Add Todo Item</DialogTitle>
				</DialogHeader>
				<FormProvider {...methods}>
					<form onSubmit={methods.handleSubmit(onSubmit)}>
						<div className="mb-4 flex flex-col gap-y-2">
							{fields.map(({ id, completed }, i) => (
								<div key={id} className="flex items-center gap-x-2">
									<Checkbox
										title="Completed"
										checked={completed}
										onCheckedChange={(value) => {
											update(i, { todo: values.todos[i].todo, completed: !!value });
										}}
									/>
									<div className="w-full">
										<Input
											id={`todos.${i}.todo`}
											{...methods.register(`todos.${i}.todo`)}
											placeholder="Todo Item"
											autoFocus
											autoComplete="off"
											autoCorrect="off"
											spellCheck={false}
											className={cn(!!errors?.[i]?.todo?.message && "border-red-600 text-red-600")}
										/>
										{!!errors?.[i]?.todo?.message && <p className="text-sm text-red-600 ml-1.5">{errors?.[i]?.todo?.message}</p>}
									</div>
									<div className="flex flex-shrink-0">
										<Button
											size="icon"
											onClick={() => {
												remove(i);
											}}
										><X />
										</Button>
									</div>
								</div>
							))}
							<div className="w-full flex gap-x-2 mt-6">
								<Button
									type="button"
									className="w-full"
									onClick={() => {
										append({
											todo: "",
											completed: false,
										});
									}}
								>Add More
								</Button>
								<Button
									type="button"
									className="w-full"
									onClick={() => {
										methods.setValue("todos", [{
											todo: "",
											completed: false,
										}]);
									}}
									disabled={values.todos.length <= 1}
								> Clear
								</Button>
							</div>
						</div>
						<DialogFooter>
							<Button type="submit">Save</Button>
						</DialogFooter>
					</form>
				</FormProvider>
			</DialogContent>
		</Dialog>
	);
}
