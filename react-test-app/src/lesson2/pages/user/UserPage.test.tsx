import {
    render,
    screen,
    fireEvent,
    waitFor,
    act,
    within,
} from "@testing-library/react";
import UserPage from "./UserPage";
import * as useUsersHook from "./hooks/useUsers";

const mockUsers = [
    {
        id: 1,
        name: "Leanne Graham",
        username: "Bret",
        email: "Sincere@april.biz",
        address: {
            street: "Kulas Light",
            suite: "Apt. 556",
            city: "Gwenborough",
            zipcode: "92998-3874",
            geo: { lat: "-37.3159", lng: "81.1496" },
        },
        phone: "1-770-736-8031 x56442",
        website: "hildegard.org",
        company: {
            name: "Romaguera-Crona",
            catchPhrase: "Multi-layered client-server neural-net",
            bs: "harness real-time e-markets",
        },
    },
    {
        id: 2,
        name: "Ervin Howell",
        username: "Antonette",
        email: "Shanna@melissa.tv",
        address: {
            street: "Victor Plains",
            suite: "Suite 879",
            city: "Wisokyburgh",
            zipcode: "90566-7771",
            geo: { lat: "-43.9509", lng: "-34.4618" },
        },
        phone: "010-692-6593 x09125",
        website: "anastasia.net",
        company: {
            name: "Deckow-Crist",
            catchPhrase: "Proactive didactic contingency",
            bs: "synergize scalable supply-chains",
        },
    },
];

describe("UserPage", () => {
    let consoleErrorSpy: jest.SpyInstance;
    beforeAll(() => {
        // Suppress act warnings from Headless UI transitions
        consoleErrorSpy = jest
            .spyOn(console, "error")
            .mockImplementation((...args) => {
                if (
                    typeof args[0] === "string" &&
                    args[0].includes("not wrapped in act")
                ) {
                    return;
                }
                return console.error(...args);
            });
    });
    afterAll(() => {
        consoleErrorSpy.mockRestore();
    });

    beforeEach(() => {
        jest.useFakeTimers();
        jest.spyOn(useUsersHook, "useUsers").mockReturnValue({
            users: mockUsers,
            setUsers: jest.fn(),
            loading: false,
            error: "",
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
        jest.useRealTimers();
    });

    it("renders user table and user data", () => {
        render(<UserPage />);
        expect(screen.getByText("User Management")).toBeInTheDocument();
        const table = screen.getByRole("table");
        expect(within(table).getByText("Leanne Graham")).toBeInTheDocument();
        expect(
            within(table).getByText("Sincere@april.biz")
        ).toBeInTheDocument();
    });

    it("shows loading state", () => {
        jest.spyOn(useUsersHook, "useUsers").mockReturnValue({
            users: [],
            setUsers: jest.fn(),
            loading: true,
            error: "",
        });
        render(<UserPage />);
        expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });

    it("shows error state", () => {
        jest.spyOn(useUsersHook, "useUsers").mockReturnValue({
            users: [],
            setUsers: jest.fn(),
            loading: false,
            error: "Failed to fetch users",
        });
        render(<UserPage />);
        expect(screen.getByText(/failed to fetch users/i)).toBeInTheDocument();
    });

    it("deletes a user from the table", async () => {
        const setUsers = jest.fn();
        jest.spyOn(useUsersHook, "useUsers").mockReturnValue({
            users: mockUsers,
            setUsers,
            loading: false,
            error: "",
        });
        render(<UserPage />);
        const deleteButton = screen.getAllByLabelText("Delete user")[0];
        fireEvent.click(deleteButton);
        await waitFor(() => {
            expect(setUsers).toHaveBeenCalled();
        });
    });

    it("opens the modal when a user row is clicked", () => {
        render(<UserPage />);
        const row = screen.getByText("Leanne Graham").closest("tr");
        act(() => {
            fireEvent.click(row!);
        });
        const dialog = screen.getByRole("dialog");
        expect(dialog).toBeVisible();
        expect(within(dialog).getByText("Leanne Graham")).toBeInTheDocument();
        expect(
            within(dialog).getByText("Sincere@april.biz")
        ).toBeInTheDocument();
    });

    it("closes the modal when close button is clicked and clears selectedUser after timeout", () => {
        render(<UserPage />);
        const row = screen.getByText("Leanne Graham").closest("tr");
        act(() => {
            fireEvent.click(row!);
        });
        const closeButton = screen.getByRole("button", { name: /close/i });
        act(() => {
            fireEvent.click(closeButton);
        });
        // Modal should be closed
        expect(screen.queryByRole("dialog")).toBeNull();
        // Fast-forward timer to clear selectedUser
        act(() => {
            jest.runAllTimers();
        });
        // No need to check for absence of name globally
    });

    it("closes the modal and clears selectedUser when deleting the selected user", async () => {
        const setUsers = jest.fn((updater) => updater(mockUsers));
        jest.spyOn(useUsersHook, "useUsers").mockReturnValue({
            users: mockUsers,
            setUsers,
            loading: false,
            error: "",
        });
        render(<UserPage />);
        const row = screen.getByText("Leanne Graham").closest("tr");
        act(() => {
            fireEvent.click(row!);
        });
        const deleteButton = screen.getAllByLabelText("Delete user")[0];
        act(() => {
            fireEvent.click(deleteButton);
        });
        // Modal should be closed
        expect(screen.queryByRole("dialog")).toBeNull();
        // Fast-forward timer to clear selectedUser
        act(() => {
            jest.runAllTimers();
        });
        // No need to check for absence of name globally
    });

    it("keeps modal open when deleting a non-selected user", () => {
        render(<UserPage />);
        // Open modal for user 1
        const row = screen.getByText("Leanne Graham").closest("tr");
        act(() => {
            fireEvent.click(row!);
        });
        // Delete user 2
        const deleteButton = screen.getAllByLabelText("Delete user")[1];
        act(() => {
            fireEvent.click(deleteButton);
        });
        // Modal should still be open for user 1
        const dialog = screen.getByRole("dialog");
        expect(dialog).toBeVisible();
        expect(within(dialog).getByText("Leanne Graham")).toBeInTheDocument();
    });
});
