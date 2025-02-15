export default function AddressInputs({
  addressProps,
  setAddressProp,
  disabled = false,
}) {
  const { phone, hall, userEmail } = addressProps;

  return (
    <>
      <label>Phone</label>
      <input
        disabled={disabled}
        type="tel"
        placeholder="Phone number"
        value={phone || ""}
        required
        onChange={(ev) => setAddressProp("phone", ev.target.value)}
      />
      <label>Hall</label>
      <input
        disabled={disabled}
        type="text"
        placeholder="Hall of residence"
        value={hall || ""}
        onChange={(ev) => setAddressProp("hall", ev.target.value)}
      />
      <label>email</label>
      <input
        disabled={disabled}
        type="email"
        placeholder="email"
        required
        value={userEmail || ""}
        onChange={(ev) => setAddressProp("userEmail", ev.target.value)}
      />
    </>
  );
}
