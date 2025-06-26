import "@testing-library/jest-dom";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { UserModal } from "./UserModal";
import type { User } from "../types";

describe("UserModal", () => {
    const user: User = {
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

    it("renders user info when open", async () => {
        await act(async () => {
            render(<UserModal user={user} isOpen={true} onClose={jest.fn()} />);
        });
        expect(screen.getByText("John Doe")).toBeInTheDocument();
        expect(screen.getByText("john@example.com")).toBeInTheDocument();
        expect(screen.getByText(/Apt 1, Main St/)).toBeInTheDocument();
        expect(screen.getByText(/Metropolis, 12345/)).toBeInTheDocument();
        expect(screen.getByText("123-456-7890")).toBeInTheDocument();
        expect(screen.getByText("example.com")).toBeInTheDocument();
        const companySections = document.querySelectorAll(".section");
        const companySection = companySections[companySections.length - 1];
        expect(companySection).toHaveTextContent("Name: Acme Corp");
        expect(companySection).toHaveTextContent("Catchphrase: We build stuff");
        expect(companySection).toHaveTextContent("Business: business");
    });

    it("renders email as a mailto link", async () => {
        await act(async () => {
            render(<UserModal user={user} isOpen={true} onClose={jest.fn()} />);
        });
        const emailLink = screen.getByRole("link", {
            name: "john@example.com",
        });
        expect(emailLink).toHaveAttribute("href", "mailto:john@example.com");
    });

    it("renders map link with correct href", async () => {
        await act(async () => {
            render(<UserModal user={user} isOpen={true} onClose={jest.fn()} />);
        });
        const mapLink = screen.getByRole("link", { name: /view on map/i });
        expect(mapLink).toHaveAttribute(
            "href",
            "https://www.google.com/maps/search/?api=1&query=0,0"
        );
        expect(mapLink).toHaveAttribute("target", "_blank");
        expect(mapLink).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("renders website as a clickable link", async () => {
        await act(async () => {
            render(<UserModal user={user} isOpen={true} onClose={jest.fn()} />);
        });
        const websiteLink = screen.getByRole("link", { name: "example.com" });
        expect(websiteLink).toHaveAttribute("href", "http://example.com");
        expect(websiteLink).toHaveAttribute("target", "_blank");
        expect(websiteLink).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("calls onClose when close button is clicked", async () => {
        const onClose = jest.fn();
        await act(async () => {
            render(<UserModal user={user} isOpen={true} onClose={onClose} />);
        });
        const closeButton = screen.getByRole("button", { name: /close/i });
        await act(async () => {
            fireEvent.click(closeButton);
        });
        expect(onClose).toHaveBeenCalled();
    });

    it("does not render content when closed", async () => {
        await act(async () => {
            render(
                <UserModal user={user} isOpen={false} onClose={jest.fn()} />
            );
        });
        expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
    });
});
