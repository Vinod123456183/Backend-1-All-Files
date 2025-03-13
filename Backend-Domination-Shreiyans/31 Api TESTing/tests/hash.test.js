const hashedpassword = require("../testing");

describe("testing the hashed password", () => {
  it("should hash a password correctly", async () => {
    const password = "abcdef";
    const hashed = await hashedpassword(password);
    expect(hashed).not.toBe(password);
  });
});
