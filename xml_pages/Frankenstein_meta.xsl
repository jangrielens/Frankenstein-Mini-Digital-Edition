<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    xmlns:tei="http://www.tei-c.org/ns/1.0"
    exclude-result-prefixes="xs tei"
    version="2.0">
    
    <!-- <xsl:output method="xml" omit-xml-declaration="yes" indent="yes" /> -->

    
    <xsl:template match="tei:TEI">
                     
						
    <div class="container">
	    <table class="one-line-table">
	        <tr>
	            <th><strong style="margin: 10px;">Statistics</strong></th>
	            <th>Total</th>
	            <th>Mary Shelley</th>
				<th>Percy Shelley</th>
	        </tr>
	        <tr>
	            <td>Modifications</td>
	            <td><xsl:value-of select="count(//tei:del|//tei:add)" /></td>
	            <td><xsl:value-of select="count(//tei:del|//tei:add) - count(//tei:del[@hand='#PBS']|//tei:add[@hand='#PBS'])" /></td>
				<td><xsl:value-of select="count(//tei:del[@hand='#PBS']|//tei:add[@hand='#PBS'])" /></td>
	        </tr>
	        <tr>
	            <td>Additions</td>
	            <td><xsl:value-of select="count(//tei:add)" /></td>
				<td><xsl:value-of select="count(//tei:add) - count(//tei:add[@hand='#PBS'])" /></td>
	            <td><xsl:value-of select="count(//tei:add[@hand='#PBS'])" /></td>
	            
	        </tr>
	        <tr>
	            <td>Deletions</td>
	            <td><xsl:value-of select="count(//tei:del)" /></td>
				<td><xsl:value-of select="count(//tei:del) - count(//tei:del[@hand='#PBS'])" /></td>
	            <td><xsl:value-of select="count(//tei:del[@hand='#PBS'])" /></td>
	            
	        </tr>
	    </table>
		
</div>



                    
        
    </xsl:template>
    

</xsl:stylesheet>
