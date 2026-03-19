'use client'
import { createClient } from '@supabase/supabase-js'
import { useState, useEffect } from "react";

import supabase from '../conexao/bancos';

export default function Pedidos() {

  const [listaPedidos, alteraListaPedidos] = useState([])


  async function buscaPedidos() {
    const { data, error } = await supabase
      .from('pedidos')
      .select("*")
    alteraListaPedidos(data)

  }


  useEffect(() => {
    buscaPedidos()
  }, [])


  return (
    <div className="container">

      <h2 className="text-center">Pedidos em aberto 🚨</h2>

    </div>
  );
}










