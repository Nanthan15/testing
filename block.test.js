const Block = require('./block');
const { GENESIS_DATA } = require('./config');
const cryptoHash = require('./crypto-hash');


describe('Block',()=>{
    const timestamp = 'a-data';
    const lastHash= 'foo-hash';
    const hash='bar-hash';
    const data = ['blockchain','data'];
    const block = new Block({timestamp,  lastHash,   hash ,   data});

    it('has a timestamp,lasthash,hash,and data property',()=>{
        expect(block.timestamp).toEqual(timestamp);
        expect(block.lastHash).toEqual(lastHash);
        expect(block.hash).toEqual(hash);
        expect(block.data).toEqual(data);
        
    });

    describe('genesis()',()=>{
        const genesisBlock = Block.genesis();

        

        it('return a block instance',()=>{
            expect(genesisBlock instanceof Block).toBe(true);
        });


        it('returns the gensis data',()=>{
            expect(genesisBlock).toEqual(GENESIS_DATA);
        })
    });




    describe('mineBlock()',()=>{
        const lastBlock = Block.genesis();
        const data = 'mined-data';
        const minedBlock = Block.mineBlock({lastBlock, data});


        it('return a block instance',()=>{
            expect(minedBlock instanceof Block).toBe(true);
        });

        it('sets the `lastHash` to be the `hash` of the lastlock',()=>{
            expect(minedBlock.lastHash).toEqual(lastBlock.hash);
        });
        

        it('sets the `data`',()=>{
            expect(minedBlock.data).toEqual(data);
        })

        it('sets the `timestamp`',()=>{
            expect(minedBlock.timestamp).not.toEqual(undefined);
        })

        it('create a SHA-256  hash based on the input',()=>{
            expect(minedBlock.hash).toEqual(cryptoHash(minedBlock.timestamp,lastBlock.hash,data));
        })



    })
    
});