import * as main from "../common/main";

main.module.filter('format', () => {
    return (input: string, ...params: string[]) => {
        return input && input.replace(/{{|}}|{(\d+)}/g, (match, index) => {
            switch (match) {
                case "{{":
                    return "{";
                case "}}":
                    return "}";
                default:
                    return index < params.length ? params[index] : match;
            }
        });
  };
});