import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import StatCardBar from "./StatCardBar"

jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn()
}))

import { useQuery } from "@tanstack/react-query"
import { Concert } from "@/types/concert.type"

describe("StatCardBar", () => {
  const mockConcerts:Concert[] = [
    {
        id: "001", totalOfSeat: 100,
        concertName: "test001",
        description: "des001",
        outOfTicket: false,
        isReserved: false
    },
    {
        id: "002", totalOfSeat: 50,
        concertName: "test002",
        description: "des002",
        outOfTicket: false,
        isReserved: false
    }
  ];

  it("should render total seats correctly", () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: { RESERVE: 10, CANCEL: 2 },
      isLoading: false,
      isError: false
    })
    render(<StatCardBar data={mockConcerts} />)
    expect(screen.getByText("Total of seats")).toBeInTheDocument()
    expect(screen.getByText("150")).toBeInTheDocument()
  })


  it("should show reserve and cancel summary", () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: { RESERVE: 25, CANCEL: 5 },
      isLoading: false,
      isError: false
    })
    render(<StatCardBar data={mockConcerts} />)
    expect(screen.getByText("Reserve")).toBeInTheDocument()
    expect(screen.getByText("25")).toBeInTheDocument()
    expect(screen.getByText("Cancel")).toBeInTheDocument()
    expect(screen.getByText("5")).toBeInTheDocument()
  })


  it("should handle cancel 0", () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: { RESERVE: 1, CANCEL: 0 },
      isLoading: false,
      isError: false
    })
    render(<StatCardBar data={mockConcerts} />)
    expect(screen.getByText("Reserve")).toBeInTheDocument()
    expect(screen.getByText("1")).toBeInTheDocument()
    expect(screen.getByText("Cancel")).toBeInTheDocument()
    expect(screen.getByText("0")).toBeInTheDocument()
  })
})