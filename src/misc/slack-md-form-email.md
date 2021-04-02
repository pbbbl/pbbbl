------------------------------------------\n
New Form Submission Received\n
------------------------------------------\n
*From* ..... <http: //www.foo.com|This message *is* a link><a href="mailto:{{4.data.user_email}}?subject=RE: {{4.name}} - {{46.`Submission ID`}}">{{4.data.user_name}}</a></p>
<p><small><strong>Email</strong>    <a href="mailto:{{4.data.user_email}}?subject=RE: {{4.name}} - {{46.`Submission ID`}}">{{4.data.user_email}}</a></p>
<p><small><strong>Date</strong>    
        {{formatDate(4.d; "ddd, MMMM D, YYYY @ hh:mm a")}}</small></p>
<h2 style="font-size: 18px;">Message</h2>
<p>{{46.message}}</p>
<p><small><strong>END-OF-MESSAGE</strong></small></p>
<br>
<a href="mailto:{{4.data.user_email}}?subject=RE: {{4.name}} - {{46.`Submission ID`}}" background="#1738ff" target="_blank" style="display: table-cell; background-color: #1738ff !important; color: #ffffff !important; padding: 15px; border-radius: 6px; text-decoration: none !important;">
    Reply to Edna Mode
</a>
<br><br>
<p><small><strong>Submission ID</strong>    <br>{{46.`Submission ID`}}
    </small></p>
<br><br><br>
<hr>
<p><strong>INTERNAL USE ONLY</strong></p>
<p><i>This email is automatically generated. If you have any questions, contact Tyler</i></p>
<h3 style="font-size:16px;">All Form Data</h3>
<ul style="list-style:none;padding:0;">
    <li><strong>Form Name</strong> <br>{{4.name}}<br><br></li>
    {{44.code}}
</ul>
.
.
.
------------------------------------------
<h3>Webflow Data</h3>
<p>
    <strong>Site ID</strong> {{4.site}}
</p>
<p>
    <strong>Form Name</strong> {{4.name}}
</p>
<p>
    <strong>Webhook ID</strong> {{4.`_id`}}
</p>
