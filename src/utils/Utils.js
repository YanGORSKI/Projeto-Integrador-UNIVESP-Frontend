export const formatCurrency = (value) => {
    console.log(value);
    const numberValue = value ?? 0; // Define zero se o valor for undefined ou null
    return numberValue.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });
};