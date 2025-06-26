import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { getUserTableColumns } from "./userTableColumns";
import type { User } from "../types";

describe("getUserTableColumns", () => {
    const mockUser: User = {
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
    };

    it("returns the correct column structure", () => {
        const columns = getUserTableColumns(jest.fn());
        expect(columns).toHaveLength(6);
        expect(columns.map((c) => c.header)).toEqual([
            "Name / Email",
            "Address",
            "Phone",
            "Website",
            "Company",
            "Actions",
        ]);
        expect(columns.map((c) => c.accessor)).toEqual([
            "name",
            "address",
            "phone",
            "website",
            "company",
            "id",
        ]);
    });

    it("renders name and email correctly", () => {
        const columns = getUserTableColumns(jest.fn());
        const { render: renderCell } = columns[0];
        render(<>{renderCell!(mockUser.name, mockUser)}</>);
        expect(screen.getByText("John Doe")).toBeInTheDocument();
        expect(screen.getByText("john@example.com")).toBeInTheDocument();
    });

    it("renders address correctly", () => {
        const columns = getUserTableColumns(jest.fn());
        const { render: renderCell } = columns[1];
        render(<>{renderCell!(mockUser.address, mockUser)}</>);
        expect(screen.getByText(/Apt 1, Main St,/)).toBeInTheDocument();
        expect(screen.getByText(/Metropolis, 12345/)).toBeInTheDocument();
    });

    it("renders website as a link", () => {
        const columns = getUserTableColumns(jest.fn());
        const { render: renderCell } = columns[3];
        render(<>{renderCell!(mockUser.website, mockUser)}</>);
        const link = screen.getByRole("link", { name: /example.com/ });
        expect(link).toHaveAttribute("href", "http://example.com");
        expect(link).toHaveAttribute("target", "_blank");
        expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("renders company name", () => {
        const columns = getUserTableColumns(jest.fn());
        const { render: renderCell } = columns[4];
        render(<>{renderCell!(mockUser.company, mockUser)}</>);
        expect(screen.getByText("Acme Corp")).toBeInTheDocument();
    });

    it("renders actions button and calls onDeleteUser", () => {
        const onDeleteUser = jest.fn();
        const columns = getUserTableColumns(onDeleteUser);
        const { render: renderCell } = columns[5];
        render(<>{renderCell!(mockUser.id, mockUser)}</>);
        const button = screen.getByRole("button", { name: /delete user/i });
        expect(button).toBeInTheDocument();
        fireEvent.click(button);
        expect(onDeleteUser).toHaveBeenCalledWith(1);
        expect(button).toHaveAttribute("aria-label", "Delete user");
        expect(button).toHaveAttribute("title", "Delete user");
    });
});
