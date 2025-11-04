<script>
	import { onMount } from 'svelte';
	import { onboardingStore } from '$lib/stores/onboarding.js';
	import OnboardingFlow from '$lib/components/OnboardingFlow.svelte';

	let isScrolled = $state(false);
	let mobileMenuOpen = $state(false);

	onMount(() => {
		const handleScroll = () => {
			isScrolled = window.scrollY > 50;
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});
</script>

<svelte:head>
	<title>Contact Sales - SpikedAI</title>
	<script>
		// Zoho Form Validation Scripts
		var dateAndMonthRegexFormateArray = [
			"^(([0][1-9])|([1-2][0-9])|([3][0-1]))[-](Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)[-](?:(?:19|20)[0-9]{2})$",
			"^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)[-](?:(?:19|20)[0-9]{2})$"
		];
		var zf_DateRegex = new RegExp(dateAndMonthRegexFormateArray[0]);
		var zf_MonthYearRegex = new RegExp(dateAndMonthRegexFormateArray[1]);
		var zf_MandArray = ["Name_First", "Name_Last", "SingleLine", "SingleLine2", "Email", "PhoneNumber_countrycode", "PhoneNumber_countrycodeval", "MultiLine"];
		var zf_FieldArray = ["Name_First", "Name_Last", "SingleLine", "SingleLine2", "Email", "PhoneNumber_countrycode", "PhoneNumber_countrycodeval", "SingleLine1", "MultiLine"];
		var isSalesIQIntegrationEnabled = true;
		var salesIQFieldsArray = [
			{ "formFieldName": "Email", "formFieldType": 9, "salesIQFieldName": "Email" },
			{ "formFieldName": "PhoneNumber", "formFieldType": 11, "salesIQFieldName": "Phone" },
			{ "formFieldName": "Name", "formFieldType": 7, "salesIQFieldName": "Name", "fieldCompLinkName": "Name_First" }
		];

		function zf_ValidateAndSubmit() {
			if (zf_CheckMandatory()) {
				if (zf_ValidCheck()) {
					if (isSalesIQIntegrationEnabled) {
						zf_addDataToSalesIQ();
					}
					return true;
				} else {
					return false;
				}
			} else {
				return false;
			}
		}

		function zf_CheckMandatory() {
			for (var i = 0; i < zf_MandArray.length; i++) {
				var fieldObj = document.forms.form[zf_MandArray[i]];
				if (fieldObj) {
					if (fieldObj.nodeName != null) {
						if (((fieldObj.value).replace(/^\s+|\s+$/g, '')).length == 0) {
							fieldObj.focus();
							zf_ShowErrorMsg(zf_MandArray[i]);
							return false;
						} else if (fieldObj.nodeName == 'SELECT') {
							if (fieldObj.options[fieldObj.selectedIndex].value == '-Select-') {
								fieldObj.focus();
								zf_ShowErrorMsg(zf_MandArray[i]);
								return false;
							}
						}
					}
				}
			}
			return true;
		}

		function zf_ValidCheck() {
			var isValid = true;
			for (var ind = 0; ind < zf_FieldArray.length; ind++) {
				var fieldObj = document.forms.form[zf_FieldArray[ind]];
				if (fieldObj) {
					if (fieldObj.nodeName != null) {
						var checkType = fieldObj.getAttribute("checktype");
						if (checkType == "c5") {
							if (!zf_ValidateEmailID(fieldObj)) {
								isValid = false;
								fieldObj.focus();
								zf_ShowErrorMsg(zf_FieldArray[ind]);
								return false;
							}
						} else if (checkType == "c7") {
							if (!zf_ValidatePhone(fieldObj)) {
								isValid = false;
								fieldObj.focus();
								zf_ShowErrorMsg(zf_FieldArray[ind]);
								return false;
							}
						}
					}
				}
			}
			return isValid;
		}

		function zf_ShowErrorMsg(uniqName) {
			for (var errInd = 0; errInd < zf_FieldArray.length; errInd++) {
				var fldLinkName = zf_FieldArray[errInd].split('_')[0];
				var errElem = document.getElementById(fldLinkName + "_error");
				if (errElem) errElem.style.display = 'none';
			}
			var linkName = uniqName.split('_')[0];
			var errElem = document.getElementById(linkName + "_error");
			if (errElem) errElem.style.display = 'block';
		}

		function zf_ValidateEmailID(elem) {
			var check = 0;
			var emailValue = elem.value;
			if (emailValue != null && emailValue != "") {
				var emailArray = emailValue.split(",");
				for (var i = 0; i < emailArray.length; i++) {
					var emailExp = /^[\w]([\w\-.+&'/]*)@([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,22}$/;
					if (!emailExp.test(emailArray[i].replace(/^\s+|\s+$/g, ''))) {
						check = 1;
					}
				}
				if (check == 0) {
					return true;
				} else {
					return false;
				}
			} else {
				return true;
			}
		}

		function zf_ValidatePhone(inpElem) {
			var ZFPhoneRegex = {
				PHONE_INTE_ALL_REG: /^[+]{0,1}[()0-9-. ]+$/,
				PHONE_INTE_NUMERIC_REG: /^[0-9]+$/,
				PHONE_CONT_CODE_REG: /^[+][0-9]{1,4}$/
			};
			var phoneFormat = parseInt(inpElem.getAttribute("phoneFormat"));
			var fieldInpVal = inpElem.value.replace(/^\s+|\s+$/g, '');
			var toReturn = true;
			if (phoneFormat === 1) {
				if (inpElem.getAttribute("valType") == 'code') {
					var codeRexp = ZFPhoneRegex.PHONE_CONT_CODE_REG;
					if (fieldInpVal != "" && !codeRexp.test(fieldInpVal)) {
						return false;
					}
				} else {
					var IRexp = ZFPhoneRegex.PHONE_INTE_ALL_REG;
					if (inpElem.getAttribute("phoneFormatType") == '2') {
						IRexp = ZFPhoneRegex.PHONE_INTE_NUMERIC_REG;
					}
					if (fieldInpVal != "" && !IRexp.test(fieldInpVal)) {
						toReturn = false;
						return toReturn;
					}
				}
				return toReturn;
			}
		}

		function getSalesiqPhoneVal(inpElem) {
			var fieldLinkName = inpElem.getAttribute("compname");
			var phoneFormat = inpElem.getAttribute("phoneFormat");
			var salesIQValue = "";
			if (phoneFormat === "1") {
				var isCodeEnabled = inpElem.getAttribute("isCountryCodeEnabled");
				salesIQValue = document.getElementById("international_" + fieldLinkName + "_countrycode").value;
				if (salesIQValue != null && salesIQValue !== "" && isCodeEnabled === "true") {
					salesIQValue = document.getElementById("international_" + fieldLinkName + "_countrycodeval").value + salesIQValue;
				}
			}
			return salesIQValue;
		}

		function zf_addDataToSalesIQ() {
			var visitorinfo = {};
			var zfFieldValueMap = {};
			var elements = document.getElementById("form").elements;
			for (var elmIdx = 0; elmIdx < elements.length; elmIdx++) {
				var inpElem = elements[elmIdx];
				var fieldType = inpElem.getAttribute("fieldType");
				if (fieldType === "1" || fieldType === "7" || fieldType === "9" || fieldType === "11") {
					var nameAttr = inpElem.getAttribute("name");
					if (fieldType === "1" || fieldType === "7" || fieldType === "9") {
						zfFieldValueMap[nameAttr] = inpElem.value;
					}
					if (fieldType === "11") {
						var compLinkAttr = inpElem.getAttribute("compname");
						zfFieldValueMap[compLinkAttr] = getSalesiqPhoneVal(inpElem);
					}
				}
			}
			for (var siqIdx = 0; siqIdx < salesIQFieldsArray.length; siqIdx++) {
				var salesIQObj = salesIQFieldsArray[siqIdx];
				var salesIQFieldName = salesIQObj.salesIQFieldName;
				var zfFieldName = salesIQObj.formFieldName;
				var zfFldCompLinkName = salesIQObj.fieldCompLinkName;
				var value = "";
				if (zfFieldValueMap.hasOwnProperty(zfFieldName)) {
					value = zfFieldValueMap[zfFieldName];
				} else if (zfFieldValueMap.hasOwnProperty(zfFldCompLinkName)) {
					value = zfFieldValueMap[zfFldCompLinkName];
				}
				if (salesIQFieldName === "Phone") {
					visitorinfo.contactnumber = value;
				} else if (salesIQFieldName === "Email") {
					visitorinfo.email = value;
				} else if (salesIQFieldName === "Name") {
					visitorinfo.name = value;
				}
			}
			parent.postMessage(JSON.stringify({ type: 'zoho.salesiq.apimessage', visitor: visitorinfo }), '*');
		}
	</script>
</svelte:head>

<!-- Navbar -->
<nav class="fixed top-0 left-0 right-0 z-50 transition-all duration-700 {isScrolled ? 'bg-black/90 backdrop-blur-xl border-b border-red-900/30' : 'bg-transparent'}">
	<div class="max-w-7xl mx-auto px-6 py-5">
		<div class="flex items-center justify-between">
			<a href="/" class="group flex items-center gap-3 cursor-pointer">
				<div class="relative">
					<!-- Animated red glow -->
					<div class="absolute inset-0 bg-gradient-to-r from-red-600 to-red-800 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
					<!-- Logo container -->
					<div class="relative bg-gradient-to-br from-zinc-900 to-black p-2 rounded-lg border border-red-900/50 group-hover:border-red-600 transition-all duration-500">
						<img src="/Spiked.ai-white-logo-icon-only.png" alt="SpikedAI Logo" class="h-7 w-7 rounded transform group-hover:scale-110 transition-transform duration-500" />
					</div>
				</div>
				<div class="flex flex-col">
					<span class="text-xl font-black tracking-tight text-white group-hover:text-red-500 transition-colors duration-300">
						SPIKED<span class="text-red-600">AI</span>
					</span>
					<span class="text-[10px] text-zinc-500 font-medium tracking-wider uppercase -mt-0.5">Revenue Intelligence OS</span>
				</div>
			</a>
			
		<div class="hidden md:flex items-center gap-1">
			<a href="/" class="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-red-500 transition-colors duration-300">Home</a>
			<a href="/features" class="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-red-500 transition-colors duration-300">Features</a>
			<a href="https://spikedai.vercel.app/" target="_blank" rel="noopener noreferrer" class="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-red-500 transition-colors duration-300">Platform</a>
			<a href="/contact-sales" class="px-4 py-2 text-sm font-medium text-red-500 transition-colors duration-300">Contact Sales</a>
			
			<div class="ml-4 flex items-center gap-3">
					<button class="px-4 py-2 text-sm font-semibold text-white hover:text-red-500 transition-colors duration-300">
						Log In
					</button>
					<button 
						onclick={() => onboardingStore.start()}
						class="group relative px-6 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded font-semibold text-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-red-600/50"
					>
						<span class="relative z-10">Get Started</span>
						<div class="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
					</button>
				</div>
			</div>

			<!-- Mobile Menu Button -->
			<button 
				onclick={() => mobileMenuOpen = !mobileMenuOpen}
				class="md:hidden p-2 text-zinc-400 hover:text-red-500 transition-colors duration-300"
				aria-label="Toggle mobile menu"
			>
				<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
				</svg>
			</button>
		</div>

	<!-- Mobile Menu -->
	{#if mobileMenuOpen}
		<div class="md:hidden mt-4 pb-4 space-y-2 border-t border-red-900/30 pt-4">
			<a href="/" class="block w-full text-left px-4 py-2 text-zinc-400 hover:text-red-500 hover:bg-red-950/30 rounded transition-all duration-300">Home</a>
			<a href="/features" class="block w-full text-left px-4 py-2 text-zinc-400 hover:text-red-500 hover:bg-red-950/30 rounded transition-all duration-300">Features</a>
			<a href="https://spikedai.vercel.app/" target="_blank" rel="noopener noreferrer" class="block w-full text-left px-4 py-2 text-zinc-400 hover:text-red-500 hover:bg-red-950/30 rounded transition-all duration-300">Platform</a>
			<a href="/contact-sales" class="block w-full text-left px-4 py-2 text-red-500 hover:bg-red-950/30 rounded transition-all duration-300">Contact Sales</a>
		</div>
	{/if}
	</div>
</nav>

<!-- Contact Sales Hero Section -->
<section class="min-h-screen bg-black relative overflow-hidden pt-32 pb-20">
	<!-- Animated Grid Background -->
	<div class="absolute inset-0">
		<div class="absolute inset-0 bg-gradient-to-b from-red-950/20 via-black to-black"></div>
		<div class="absolute inset-0" style="background-image: linear-gradient(rgba(220, 38, 38, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(220, 38, 38, 0.05) 1px, transparent 1px); background-size: 50px 50px;"></div>
		
		<!-- Animated Red Orbs -->
		<div class="absolute top-1/4 right-1/4 w-96 h-96 bg-red-600/20 rounded-full blur-3xl animate-float"></div>
		<div class="absolute bottom-1/4 left-1/4 w-96 h-96 bg-red-800/10 rounded-full blur-3xl animate-float-delayed"></div>
	</div>

	<div class="relative z-10 max-w-7xl mx-auto px-6">
		<div class="grid lg:grid-cols-2 gap-16 items-start">
			<!-- Left Column - Information -->
			<div class="space-y-8">
				<div class="space-y-4">
					<div class="inline-flex items-center gap-2 px-4 py-2 bg-zinc-950/80 backdrop-blur-xl rounded-full border border-red-900/50">
						<div class="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
						<span class="text-xs font-bold text-red-500 tracking-wider uppercase">Talk to Sales</span>
					</div>
					
					<h1 class="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-none tracking-tighter">
						Let's Transform<br />
						<span class="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
							Your Sales Process
						</span>
					</h1>
					
					<p class="text-xl text-zinc-400 leading-relaxed">
						Schedule a personalized demo with our team and discover how SpikedAI can revolutionize your sales conversations with real-time AI intelligence.
					</p>
				</div>

				<!-- Benefits List -->
				<div class="space-y-4">
					{#each [
						{
							title: 'Personalized Demo',
							description: 'See exactly how SpikedAI fits your workflow',
							icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z'
						},
						{
							title: 'Custom Solutions',
							description: 'Tailored pricing and features for your team',
							icon: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4'
						},
						{
							title: 'Expert Support',
							description: 'Dedicated onboarding and training',
							icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
						}
					] as benefit}
						<div class="group flex items-start gap-4 p-4 bg-zinc-950/50 rounded-lg border border-zinc-900 hover:border-red-900/50 transition-all duration-300">
							<div class="flex-shrink-0 p-2 bg-red-950/30 rounded-lg border border-red-900/30 group-hover:border-red-600/50 transition-all duration-300">
								<svg class="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={benefit.icon} />
								</svg>
							</div>
							<div>
								<h3 class="text-lg font-bold text-white mb-1 group-hover:text-red-500 transition-colors duration-300">
									{benefit.title}
								</h3>
								<p class="text-sm text-zinc-500">{benefit.description}</p>
							</div>
						</div>
					{/each}
				</div>

				<!-- Trust Indicators -->
				<div class="grid grid-cols-3 gap-4 pt-8 border-t border-zinc-900">
					{#each [
					
					] as indicator}
						<div class="text-center">
							<div class="text-3xl font-black text-white mb-1">{indicator.stat}</div>
							<div class="text-xs text-zinc-500 uppercase tracking-wider">{indicator.label}</div>
						</div>
					{/each}
				</div>
			</div>

			<!-- Right Column - Contact Form -->
			<div class="lg:sticky lg:top-32">
				<div class="bg-zinc-950/80 backdrop-blur-xl border border-zinc-900 rounded-2xl p-8 shadow-2xl">
					<!-- Zoho Form Integration -->
					<div class="space-y-2 mb-6">
						<h2 class="text-2xl font-bold text-white">Get Started Today</h2>
						<p class="text-sm text-zinc-500">Fill out the form and we'll be in touch shortly.</p>
					</div>

					<form
						action="https://forms.zohopublic.in/einsteini/form/CONTACTUS/formperma/JxLWUxq9cpXYKp2TuFg7u3HCZHJgh6X6zBNWzYYeXSM/htmlRecords/submit"
						name="form"
						method="POST"
						accept-charset="UTF-8"
						enctype="multipart/form-data"
						id="form"
						class="space-y-6"
						onsubmit={(e) => {
							document.charset = 'UTF-8';
							if (!window.zf_ValidateAndSubmit()) {
								e.preventDefault();
								return false;
							}
						}}
					>
						<input type="hidden" name="zf_referrer_name" value="">
						<input type="hidden" name="zf_redirect_url" value="">
						<input type="hidden" name="zc_gad" value="">

						<!-- Name Fields -->
						<div class="grid grid-cols-2 gap-4">
							<div class="space-y-2">
								<label for="Name_First" class="block text-sm font-semibold text-zinc-300">
									First Name <span class="text-red-500">*</span>
								</label>
								<input
									type="text"
									id="Name_First"
									name="Name_First"
									fieldType="7"
									maxlength="255"
									placeholder="John"
									class="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-600 focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all duration-300 outline-none"
								/>
							</div>
							<div class="space-y-2">
								<label for="Name_Last" class="block text-sm font-semibold text-zinc-300">
									Last Name <span class="text-red-500">*</span>
								</label>
								<input
									type="text"
									id="Name_Last"
									name="Name_Last"
									fieldType="7"
									maxlength="255"
									placeholder="Doe"
									class="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-600 focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all duration-300 outline-none"
								/>
							</div>
						</div>
						<p id="Name_error" class="zf-errorMessage text-xs text-red-500" style="display:none;">Please enter your name</p>

						<!-- Company -->
						<div class="space-y-2">
							<label for="SingleLine" class="block text-sm font-semibold text-zinc-300">
								Company <span class="text-red-500">*</span>
							</label>
							<input
								type="text"
								id="SingleLine"
								name="SingleLine"
								checktype="c1"
								fieldType="1"
								maxlength="255"
								placeholder="Your Company Name"
								class="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-600 focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all duration-300 outline-none"
							/>
							<p id="SingleLine_error" class="zf-errorMessage text-xs text-red-500" style="display:none;">Please enter company name</p>
						</div>

						<!-- Company URL -->
						<div class="space-y-2">
							<label for="SingleLine2" class="block text-sm font-semibold text-zinc-300">
								Company URL <span class="text-red-500">*</span>
							</label>
							<input
								type="text"
								id="SingleLine2"
								name="SingleLine2"
								checktype="c1"
								fieldType="1"
								maxlength="255"
								placeholder="https://your-company.com"
								class="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-600 focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all duration-300 outline-none"
							/>
							<p id="SingleLine2_error" class="zf-errorMessage text-xs text-red-500" style="display:none;">Please enter company URL</p>
						</div>

						<!-- Email -->
						<div class="space-y-2">
							<label for="Email" class="block text-sm font-semibold text-zinc-300">
								Work Email <span class="text-red-500">*</span>
							</label>
							<input
								type="email"
								id="Email"
								name="Email"
								checktype="c5"
								fieldType="9"
								maxlength="255"
								placeholder="john@company.com"
								class="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-600 focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all duration-300 outline-none"
							/>
							<p id="Email_error" class="zf-errorMessage text-xs text-red-500" style="display:none;">Please enter valid email</p>
						</div>

						<!-- Phone -->
						<div class="space-y-2">
							<label class="block text-sm font-semibold text-zinc-300">
								Phone <span class="text-red-500">*</span>
							</label>
							<div class="grid grid-cols-3 gap-4">
								<div>
									<input
										type="text"
										compname="PhoneNumber_countrycodeval"
										name="PhoneNumber_countrycodeval"
										checktype="c7"
										maxlength="10"
										phoneFormat="1"
										isCountryCodeEnabled="true"
										id="international_PhoneNumber_countrycodeval"
										valType="code"
										placeholder="+1"
										class="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-600 focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all duration-300 outline-none"
									/>
									<label class="block text-xs text-zinc-500 mt-1">Code</label>
								</div>
								<div class="col-span-2">
									<input
										type="text"
										compname="PhoneNumber"
										name="PhoneNumber_countrycode"
										maxlength="20"
										checktype="c7"
										phoneFormat="1"
										isCountryCodeEnabled="true"
										fieldType="11"
										id="international_PhoneNumber_countrycode"
										valType="number"
										phoneFormatType="2"
										placeholder="555-123-4567"
										class="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-600 focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all duration-300 outline-none"
									/>
									<label class="block text-xs text-zinc-500 mt-1">Number</label>
								</div>
							</div>
							<p id="PhoneNumber_error" class="zf-errorMessage text-xs text-red-500" style="display:none;">Please enter valid phone</p>
						</div>

						<!-- How did you hear about us -->
						<div class="space-y-2">
							<label for="SingleLine1" class="block text-sm font-semibold text-zinc-300">
								How Did You Hear About Us?
							</label>
							<input
								type="text"
								id="SingleLine1"
								name="SingleLine1"
								checktype="c1"
								fieldType="1"
								maxlength="255"
								placeholder="e.g., Search Engine, Social Media, Referral"
								class="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-600 focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all duration-300 outline-none"
							/>
							<p id="SingleLine1_error" class="zf-errorMessage text-xs text-red-500" style="display:none;">Invalid value</p>
						</div>

						<!-- Business Details -->
						<div class="space-y-2">
							<label for="MultiLine" class="block text-sm font-semibold text-zinc-300">
								Your Business Details <span class="text-red-500">*</span>
							</label>
							<textarea
								id="MultiLine"
								name="MultiLine"
								checktype="c1"
								maxlength="65535"
								rows="4"
								placeholder="Please describe your business needs or the challenges you are facing in your sales and revenue conversions."
								class="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-600 focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all duration-300 outline-none resize-none"
							></textarea>
							<p id="MultiLine_error" class="zf-errorMessage text-xs text-red-500" style="display:none;">Please describe your needs</p>
						</div>

						<!-- Submit Button -->
						<button
							type="submit"
							class="group relative w-full px-6 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg font-bold text-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-red-600/50"
						>
							<span class="relative z-10 flex items-center justify-center gap-2">
								Submit
								<svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
								</svg>
							</span>
							<div class="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
						</button>

						<p class="text-xs text-zinc-600 text-center">
							By submitting this form, you agree to our 
							<a href="#" class="text-red-500 hover:text-red-400 underline">Privacy Policy</a> and 
							<a href="#" class="text-red-500 hover:text-red-400 underline">Terms of Service</a>
						</p>
					</form>
				</div>

			</div>
		</div>
	</div>
</section>

<style>
	@keyframes float {
		0%, 100% {
			transform: translate(0px, 0px) scale(1);
		}
		33% {
			transform: translate(30px, -30px) scale(1.1);
		}
		66% {
			transform: translate(-20px, 20px) scale(0.9);
		}
	}

	@keyframes float-delayed {
		0%, 100% {
			transform: translate(0px, 0px) scale(1);
		}
		33% {
			transform: translate(-30px, 30px) scale(1.1);
		}
		66% {
			transform: translate(20px, -20px) scale(0.9);
		}
	}
	
	.animate-float {
		animation: float 20s infinite ease-in-out;
	}

	.animate-float-delayed {
		animation: float-delayed 25s infinite ease-in-out;
	}
</style>

<!-- Onboarding Flow Component -->
<OnboardingFlow />
