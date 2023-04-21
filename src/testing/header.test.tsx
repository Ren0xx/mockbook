// import Header from "@/components/Header";
// import { fireEvent, render, screen, waitFor } from "@testing-library/react";
// import "@testing-library/jest-dom";
// import { signOut } from "next-auth/react";

// it("test_header_displays_logo", () => {
//     // Arrange
//     const { getByText } = render(<Header />);
//     // Act
//     const logoLink = getByText("Mockbook");
//     // Assert
//     expect(logoLink).toBeInTheDocument();
//     expect(logoLink.getAttribute("href")).toBe("/");
// });

// // Tests that the Logout button is displayed when logged in and calls the signOut function when clicked.
// it("test_header_displays_logout_button", () => {
//     // Arrange
//     const { getByText } = render(<Header />);
//     const logoutButton = getByText("Logout");
//     // Act
//     fireEvent.click(logoutButton);
//     // Assert
//     expect(signOut).toHaveBeenCalled();
// });

// // Tests that the user's profile picture is displayed when logged in.
// it("test_header_displays_avatar", () => {
//     // Arrange
//     const { getByAltText } = render(<Header />);
//     const profilePicture = getByAltText("Profile picture");
//     // Assert
//     expect(profilePicture).toBeInTheDocument();
// });

// // Tests that the Logout button is not displayed when not logged in.
// it("test_header_does_not_display_logout_button", () => {
//     const { queryByText } = render(<Header />);
//     expect(queryByText("Logout")).toBeNull();
// });

// // Tests that a default profile picture is displayed when the user does not have a profile picture.
// it("test_header_displays_default_profile_picture", () => {
//     const { getByAltText } = render(<Header />);
//     const profilePicture = getByAltText("Profile picture");
//     expect(profilePicture).toBeInTheDocument();
//     expect(profilePicture.getAttribute("src")).toBe("Profile picture");
// });

// // Tests that the AppBar and Toolbar components are responsive and adjust to different screen sizes.
// it("test_header_is_responsive", () => {
//     const { container } = render(<Header />);
//     expect(container.firstChild).toHaveStyleRule("display", "flex");
//     expect(container.firstChild).toHaveStyleRule("flex-wrap", "wrap");
//     expect(container.firstChild).toHaveStyleRule(
//         "justify-content",
//         "space-between"
//     );
// });
