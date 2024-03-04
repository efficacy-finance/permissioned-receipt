module strats_receipt::receipt {
    use sui::object::{Self, ID};
    use sui::tx_context::{TxContext};
    use std::option::{Self, Option};
    use sui::bag::{Self, Bag};

    const EInvalidAcl: u64 = 0;

    struct StratsReceipt {
        issued_to: ID,
        remove_access: Option<ID>,
        data: Bag
    }

    public fun issue<T: key>(t: &T, remove_access: Option<ID>, ctx: &mut TxContext): StratsReceipt {
        StratsReceipt {
            issued_to: object::id<T>(t),
            remove_access: remove_access,
            data: bag::new(ctx)
        }
    }

    public fun add_data<K: copy + drop + store, V: store, T: key>(self: &mut StratsReceipt, t: &T, k: K, v: V) {
        assert!(object::id(t) == self.issued_to || &object::id(t) == option::borrow<ID>(&self.remove_access), EInvalidAcl);
        bag::add<K, V>(&mut self.data, k, v);
    }

    public fun borrow_data<K: copy + drop + store, V: store, T: key>(self: &StratsReceipt, t: &T, k: K): &V {
        assert!(object::id(t) == self.issued_to || &object::id(t) == option::borrow<ID>(&self.remove_access), EInvalidAcl);
        
        bag::borrow<K, V>(&self.data, k)
    }

    public fun borrow_data_mut<K: copy + drop + store, V: store, T: key>(self: &mut StratsReceipt, t: &T, k: K): &mut V {
        assert!(object::id(t) == self.issued_to || &object::id(t) == option::borrow<ID>(&self.remove_access), EInvalidAcl);
        
        bag::borrow_mut<K, V>(&mut self.data, k)
    }

    public fun remove_data<K: copy + drop + store, V: store, T: key>(self: &mut StratsReceipt, t: &T, k: K): V {
        assert!(object::id(t) == self.issued_to || &object::id(t) == option::borrow<ID>(&self.remove_access), 0);
        
        bag::remove<K, V>(&mut self.data, k)
    }

    #[allow(unused_assignment)]
    public fun burn(self: StratsReceipt) {
        let StratsReceipt { issued_to, remove_access, data } = self;
        bag::destroy_empty(data);
    }
 }