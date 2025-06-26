import "@testing-library/jest-dom";
import { renderHook, waitFor } from "@testing-library/react";
import { useUsers } from "./useUsers";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("useUsers", () => {
    const mockUsers = [
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
    ];

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("fetches users successfully", async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: mockUsers });
        const { result } = renderHook(() => useUsers());
        await waitFor(() => expect(result.current.loading).toBe(false));
        expect(result.current.users).toEqual(mockUsers);
        expect(result.current.error).toBe("");
    });

    it("handles error when fetching users fails", async () => {
        mockedAxios.get.mockRejectedValueOnce(new Error("Network error"));
        const { result } = renderHook(() => useUsers());
        await waitFor(() => expect(result.current.loading).toBe(false));
        expect(result.current.users).toEqual([]);
        expect(result.current.error).toBe("Failed to fetch users");
    });
});
