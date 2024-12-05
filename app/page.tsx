import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { hasPermission } from "@/lib/auth";
import { User, type Todo } from "@/app/data/types";
import { CheckIcon, XIcon } from "lucide-react";

const todos = [
  {
    id: "1",
    title: "Work Done",
    userId: "1",
    completed: false,
    invitedUsers: [],
  },
  {
    id: "2",
    title: "Design Pending",
    userId: "1",
    completed: true,
    invitedUsers: [],
  },
  {
    id: "3",
    title: "Build Project",
    userId: "2",
    completed: false,
    invitedUsers: [],
  },
  {
    id: "4",
    title: "Permission working",
    userId: "2",
    completed: true,
    invitedUsers: ["1", "3"],
  },
];

const user: User = { roles: ["user"], id: "3", blockedBy: [] };

export default function Home() {
  return (
    <div className="container mx-auto px-4 my-6">
      <h1 className="text-2xl font-semibold mb-4">
        {user.id}:{user.roles.join(", ")}
      </h1>
      <div className="flex gap-4 mb-4">
        <GeneralButtonCheck resource="todos" action="view" />
        <GeneralButtonCheck resource="todos" action="create" />
        <GeneralButtonCheck resource="todos" action="update" />
        <GeneralButtonCheck resource="todos" action="delete" />
      </div>
      <ul className="grid gap-4 grid-cols-2">
        {todos.map((todo) => (
          <li key={todo.id}>
            <Todo {...todo} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function Todo(todo: Todo) {
  const { title, userId, completed, invitedUsers } = todo;
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex gap-2 items-center">
          {completed ? (
            <CheckIcon className="text-green-500" />
          ) : (
            <XIcon className="text-destructive" />
          )}
          {title}
        </CardTitle>
        <CardDescription>
          User {userId}{" "}
          {invitedUsers.length > 0 && `+ User ${invitedUsers.join(", User ")}`}
        </CardDescription>
      </CardHeader>
      <CardFooter className="gap-2">
        <TodoButtonCheck action="view" todo={todo} />
        <TodoButtonCheck action="update" todo={todo} />
        <TodoButtonCheck action="delete" todo={todo} />
      </CardFooter>
    </Card>
  );
}

function GeneralButtonCheck({
  resource,
  action,
}: {
  resource: "todos" | "comments";
  action: "view" | "create" | "update" | "delete";
}) {
  return (
    <Button
      variant={
        hasPermission(user, resource, action) ? "default" : "destructive"
      }
    >
      {action} any
    </Button>
  );
}

function TodoButtonCheck({
  todo,
  action,
}: {
  todo: Todo;
  action: "view" | "delete" | "update" | "create";
}) {
  return (
    <Button
      variant={
        hasPermission(user, "todos", action, todo) ? "default" : "destructive"
      }
    >
      {action}
    </Button>
  );
}
