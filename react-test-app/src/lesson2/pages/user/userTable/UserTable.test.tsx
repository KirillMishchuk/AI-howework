import "@testing-library/jest-dom";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { UserTable } from "./UserTable";
import type { User } from "../types";

describe("UserTable", () => {
    const users: User[] = [
        {
            id: 1,
            name: "John Doe",
            username: "johndoe",
            email: "john@example.com",
            address: {
                street: "Main St",
                suite: "Apt 1",
                city: "Metropolis",
                zipcode: "12345",
                geo: { lat: "0", lng: "0" },
            },
            phone: "123-456-7890",
            website: "example.com",
            company: {
                name: "Acme Corp",
                catchPhrase: "We build stuff",
                bs: "business",
            },
        },
        {
            id: 2,
            name: "Jane Smith",
            username: "janesmith",
            email: "jane@example.com",
            address: {
                street: "Second St",
                suite: "Apt 2",
                city: "Gotham",
                zipcode: "54321",
                geo: { lat: "1", lng: "1" },
            },
            phone: "987-654-3210",
            website: "test.com",
            company: {
                name: "Beta LLC",
                catchPhrase: "We test stuff",
                bs: "testing",
            },
        },
    ];

    it("renders table with users", async () => {
        await act(async () => {
            render(
                <UserTable
                    users={users}
                    onUserClick={jest.fn()}
                    onDeleteUser={jest.fn()}
                />
            );
        });
        expect(screen.getByText("John Doe")).toBeInTheDocument();
        expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    });

    it("calls onUserClick when row is clicked", async () => {
        const onUserClick = jest.fn();
        await act(async () => {
            render(
                <UserTable
                    users={users}
                    onUserClick={onUserClick}
                    onDeleteUser={jest.fn()}
                />
            );
        });
        const row = screen.getByText("John Doe").closest("tr");
        await act(async () => {
            fireEvent.click(row!);
        });
        expect(onUserClick).toHaveBeenCalledWith(users[0]);
    });

    it("calls onDeleteUser when delete button is clicked", async () => {
        const onDeleteUser = jest.fn();
        await act(async () => {
            render(
                <UserTable
                    users={users}
                    onUserClick={jest.fn()}
                    onDeleteUser={onDeleteUser}
                />
            );
        });
        const deleteButtons = screen.getAllByRole("button", {
            name: /delete user/i,
        });
        await act(async () => {
            fireEvent.click(deleteButtons[0]);
        });
        expect(onDeleteUser).toHaveBeenCalledWith(users[0].id);
    });
});
