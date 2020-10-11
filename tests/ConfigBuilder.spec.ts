import { ConfigBuilder } from "../src/ConfigBuilder";
import { InMemoryConfig } from "../src/impl/InMemoryConfig";

describe('ConfigBuilder', () => {
    const innermostConfig = new InMemoryConfig({age: 100, gender: 'male', level: 9000});
    const midlevelConfig = new InMemoryConfig({age: 90, gender: 'hybrid'});
    const outmostConfig = new InMemoryConfig({age: 80});

    const config = ConfigBuilder.withOutmostConfig(outmostConfig)
        .thatFallbacksTo(midlevelConfig)
        .thatFallbacksTo(innermostConfig)
        .build();

    it('builds the proper composition', () => {
        expect(config.get<number>('age')).toBe(80);
        expect(config.get<string>('gender')).toBe('hybrid');
        expect(config.get<number>('level')).toBe(9000);
    });

    it('returns the fallback value only if no value is found in the chain', () => {
        expect(config.get<number>('age',    1000)).toBe(80);
        expect(config.get<string>('gender', 'AAAA')).toBe('hybrid');
        expect(config.get<number>('level',  1234)).toBe(9000);
        expect(config.get<string>('name',   'XXX')).toBe('XXX');
    });

});
